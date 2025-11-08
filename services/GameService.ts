import { createBatchRequest } from "@externaladdress4401/protobuf/protos/BatchRequest";
import { Client } from "../Client";
import { Score } from "../interfaces/Score";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { scoreToMedal } from "../utilities/scoreToMedal";
import { toArray } from "../utilities/toArray";
import prisma from "../website/beatstar/src/lib/prisma";
import { BaseService } from "./BaseService";
import {
  SyncReq,
  SyncReqEnum,
} from "@externaladdress4401/protobuf/protos/SyncReq";
import { ExecuteSharplaAuditReqEnums } from "@externaladdress4401/protobuf/protos/ExecuteSharplaAuditReq";
import { ValueOf } from "@externaladdress4401/protobuf/interfaces/ValueOf";
import { SyncResp } from "@externaladdress4401/protobuf/protos/SyncResp";
import { ExecuteSharplaAuditResp } from "@externaladdress4401/protobuf/protos/ExecuteSharplaAuditResp";
import {
  createExecuteSharplaAuditResp,
  createServerClientMessageHeader,
  createSyncResp,
} from "@externaladdress4401/protobuf/responses";
import { capitalize } from "../utilities/capitalize";
import Settings from "../Settings";
import { getUser } from "../model-services/PrismaUserService";
import { getBeatmap } from "../model-services/PrismaBeatmapService";
import { scoreToNormalStar } from "../website/beatstar/src/lib/utilities/scoreToMedal";
import { createEmptyResponse } from "@externaladdress4401/protobuf/utils";
import { tryToUpdateScore } from "../model-services/PrismaScoreService";

const RpcType = {
  5: "Sync",
  28: "ExecuteAudit",
} as const;

const BatchRequest = createBatchRequest({
  5: SyncReqEnum,
  28: ExecuteSharplaAuditReqEnums,
});

const RequestType = {
  SetSelectedSong: 8,
  RhythmGameStarted: 11,
  RhythmGameEnded: 12,
  SetCustomization: 100,
} as const;

export class GameService extends BaseService {
  name = "gameservice";

  async handlePacket(packet: Packet, client: Client) {
    let parsedPayload;
    try {
      parsedPayload = packet.parsePayload(BatchRequest);
    } catch (e) {
      Logger.saveError("Unparsable GameService request", client.clide);
      Logger.saveError(packet.buffer.toString("hex"), client.clide);
      return;
    }

    const requests = toArray(parsedPayload.requests);

    const responses = [];

    for (const request of requests) {
      const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
        Number(request.rpcType)
      ];

      if (rpcType === "Sync") {
        const parsedPayload = packet.parsePayload(SyncReq);

        const clide = parsedPayload.requests.body.session.clide.trim();

        // the user has no profile file on their device
        if (clide === "{clide}") {
          const response = await packet.buildErrorResponse({
            "{error}": {
              code: 9587,
              message: "NO_PROFILE",
              tokenId: "",
              name: "NO_PROFILE",
            },
          });
          client.write(response);
          return;
        }

        const user = await prisma.user.findFirst({
          select: {
            username: true,
            Score: true,
            starCount: true,
            selectedBeatmapId: true,
            unlockAllSongs: true,
            autoShuffle: true,
            perfectPlusHighlight: true,
            accuracyText: true,
          },
          where: {
            uuid: clide,
          },
        });

        if (!user) {
          const response = await packet.buildErrorResponse({
            "{error}": {
              code: 9588,
              message: "NO_ACCOUNT",
              tokenId: "",
              name: "NO_ACCOUNT",
            },
          });
          client.write(response);
          return;
        }

        const newsArticles = await fetchNewsArticles();
        const scores = await fetchScores(user);

        let starCount = user.starCount || 1;

        if (!user.unlockAllSongs) {
          const score = scores[0];
          if (score) {
            const singleBeatmap = await prisma.beatmap.findFirst({
              where: {
                id: score.template_id,
              },
            });
            if (singleBeatmap) {
              starCount = scoreToNormalStar(
                score.absoluteScore,
                singleBeatmap?.difficulty,
                singleBeatmap?.deluxe
              );
            }
          }
        }

        const response = await packet.buildResponse(
          createServerClientMessageHeader({}),
          createSyncResp({
            "{username}": user.username,
            "{beatmaps}": scores,
            "{NewsFeedStories}": newsArticles,
            "{starCount}": starCount || 1,
            "{selectedBeatmap}": user.selectedBeatmapId,
            "{time}": Date.now(),
            "{playerCustomizations}": {
              AutoShuffleDisabled: !user.autoShuffle,
              AccuracyModeEnabled: user.perfectPlusHighlight,
              AccuracyTextEnabled: user.accuracyText,
            },
          }),
          SyncResp,
          true
        );
        client.write(response);
        return;
      }

      if (rpcType === "ExecuteAudit") {
        const audit = request.audit;

        if (!client.clide) {
          // this should be set before getting here...
          Logger.error("Got gameservice request for client without a clide.");
          return;
        }

        if (audit.type === RequestType.SetSelectedSong) {
          const user = await getUser(prisma, client.clide, { id: true });
          if (user === null) {
            break;
          }

          const beatmap = await getBeatmap(prisma, audit.song_id);
          if (beatmap === null) {
            break;
          }

          await prisma.user.update({
            data: {
              selectedBeatmapId: audit.song_id,
            },
            where: {
              id: user.id,
            },
          });
        }
        if (audit.type === RequestType.RhythmGameStarted) {
          if (audit.song_id > 2147483647) {
            break;
          }
          await updatePlayCount(client.clide, audit.song_id);
        } else if (audit.type === RequestType.RhythmGameEnded) {
          const user = await getUser(prisma, client.clide, { id: true });
          if (user === null) {
            break;
          }
          tryToUpdateScore(prisma, user.id, audit);
        } else if (audit.type == RequestType.SetCustomization) {
          const enabled = audit.Data.Enabled ?? false;
          const user = await getUser(prisma, client.clide, { id: true });
          if (user === null) {
            return;
          }

          let fieldName: string | null = null;

          switch (audit.Data.type) {
            case 104:
              fieldName = "autoShuffle";
              break;
            case 105:
              fieldName = "perfectPlusHighlight";
              break;
            case 106:
              fieldName = "accuracyText";
              break;
          }

          if (fieldName === null) {
            Logger.error("Got unknown settings type: ", audit.Data.type);
            break;
          }

          await prisma.user.update({
            data: {
              [fieldName]: enabled,
            },
            where: {
              id: user.id,
            },
          });
        }
        responses.push(createEmptyResponse(request));
      } else {
        Logger.warn(`${this.name}: Unknown rpcType: ${request.rpcType}`);
        responses.push(createEmptyResponse(request));
      }
    }

    const response = await packet.buildResponse(
      createServerClientMessageHeader({}),
      createExecuteSharplaAuditResp({
        "{requests}": responses,
      }),
      ExecuteSharplaAuditResp
    );
    client.write(response);
  }
}

async function fetchScores(user: any) {
  const prismaBeatmaps = user.unlockAllSongs
    ? await prisma.beatmap.findMany()
    : await prisma.beatmap.findMany({
        where: {
          id: user.selectedBeatmapId,
        },
      });

  const scores: Score[] = prismaBeatmaps.map(({ id }) => ({
    template_id: id,
    BragState: {},
    HighestScore: {},
    RewardSource: 1,
    Version: 1,
    PlayedCount: 0,
  }));

  if (user.unlockAllSongs) {
    // force play count for 99999 so we can quit songs and have swipes unlocked?
    scores.find((beatmap) => beatmap.template_id === 99999)!.PlayedCount = 10;
  } else {
    scores.find(
      (beatmap) => beatmap.template_id === user.selectedBeatmapId
    )!.PlayedCount = 10;
  }

  if (user.Score) {
    for (const score of user?.Score) {
      // TODO: remove !
      const difficulty = prismaBeatmaps.find(
        (beatmap) => beatmap.id === score.beatmapId
      )?.difficulty!;
      const beatmap = scores.find(
        (beatmap) => beatmap.template_id === score.beatmapId
      );
      if (!beatmap) {
        // this shouldn't happen...
        break;
      }

      beatmap.HighestScore = {
        normalizedScore: score.normalizedScore,
        absoluteScore: score.absoluteScore,
      };

      const medal = scoreToMedal(
        score.absoluteScore,
        difficulty,
        prismaBeatmaps.find((beatmap) => beatmap.id === score.beatmapId)?.deluxe
      );

      if (medal === undefined || medal === null) {
        continue;
      }

      beatmap.HighestCheckpoint = score.highestCheckpoint ?? 0;
      beatmap.HighestStreak = score.highestStreak ?? 0;
      beatmap.HighestGrade_id = medal;
      beatmap.PlayedCount = score.playedCount;
      beatmap.absoluteScore = score.absoluteScore;
    }
  }

  return scores;
}

async function fetchNewsArticles() {
  const articles = [];
  const news = await prisma.news.findMany({
    include: {
      image: true,
    },
  });

  for (const article of news) {
    articles.push({
      type: article.type,
      requirements: [
        {
          content: article.content,
          requirements: [article.requirements],
        },
      ],
      legacyId: article.legacyId,
      viewType: capitalize(article.viewType),
      startTimeMsecs: article.startTimeMsecs.getTime(),
      endTimeMsecs: article.endTimeMsecs.getTime(),
      order: article.order,
      image: [
        {
          id: article.image.id,
          url: `${Settings.SERVER_IP}/images/${article.image.id}.png`,
          width: article.image.width,
          height: article.image.height,
          rect: [
            {
              width: article.image.rectWidth,
              height: article.image.rectHeight,
            },
          ],
        },
      ],
      title: article.title,
      status: article.status,
      id: article.id,
    });
  }

  return articles;
}

async function updatePlayCount(clide: string, beatmapId: number) {
  const user = await getUser(prisma, clide, { id: true });
  if (user === null) {
    return;
  }

  const beatmap = await getBeatmap(prisma, beatmapId);
  if (beatmap === null) {
    return;
  }

  try {
    await prisma.score.update({
      data: {
        playedCount: { increment: 1 },
      },
      where: {
        userId_beatmapId: {
          userId: user.id,
          beatmapId,
        },
      },
    });
  } catch (err) {
    if (err.code !== "P2025") throw err;
  }
}
