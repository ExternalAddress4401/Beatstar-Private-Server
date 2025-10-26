import { createBatchRequest } from "@externaladdress4401/protobuf/protos/BatchRequest";
import { Client } from "../Client";
import { Score } from "../interfaces/Score";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { greater } from "../utilities/greater";
import { medalToNormalStar, scoreToMedal } from "../utilities/scoreToMedal";
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

const RpcType = {
  5: "Sync",
  28: "ExecuteAudit",
} as const;

const BatchRequest = createBatchRequest({
  5: SyncReqEnum,
  28: ExecuteSharplaAuditReqEnums,
});

const RequestType = {
  RhythmGameStarted: 11,
  RhythmGameEnded: 12,
} as const;

export class GameService extends BaseService {
  name = "gameservice";

  async handlePacket(packet: Packet, client: Client) {
    const parsedPayload = packet.parsePayload(BatchRequest);

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

        const response = await packet.buildResponse(
          createServerClientMessageHeader({}),
          createSyncResp({
            "{username}": user.username,
            "{beatmaps}": scores,
            "{NewsFeedStories}": newsArticles,
            "{starCount}": user.starCount || 1,
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

        if (audit.type === RequestType.RhythmGameStarted) {
          await updatePlayCount(client.clide, audit.song_id);
        } else if (audit.type === RequestType.RhythmGameStarted) {
          const user = await prisma.user.findFirst({
            select: {
              id: true,
            },
            where: {
              uuid: client.clide,
            },
          });

          if (user === null) {
            Logger.error(`Failed to find user for clide: ${client.clide}`);
            return;
          }

          const beatmap = await prisma.beatmap.findFirst({
            where: {
              id: parseInt(audit.song_id),
            },
          });

          if (beatmap === null) {
            Logger.error(`Unknown beatmap provided: ${audit.song_id}`);
            return;
          }

          // this is only used in the update so a score definitely exists
          const oldScore = await prisma.score.findFirst({
            where: {
              userId: user.id,
              beatmapId: parseInt(audit.song_id),
            },
          });

          // TODO: handle deluxe here
          const oldMedal = scoreToMedal(
            oldScore?.absoluteScore,
            beatmap.difficulty,
            beatmap.deluxe
          );

          const newMedal = scoreToMedal(
            audit.score.absoluteScore,
            beatmap.difficulty,
            beatmap.deluxe
          );

          if (newMedal === null || newMedal === undefined) {
            Logger.error(`Invalid difficulty provided: ${beatmap.difficulty}`);
            return;
          }

          console.log("wow a score!");

          if (!oldScore || oldScore.absoluteScore < audit.score.absoluteScore) {
            console.log("Score update!");
            await prisma.score.upsert({
              create: {
                beatmapId: parseInt(audit.song_id),
                normalizedScore: audit.score.normalizedScore,
                absoluteScore: audit.score.absoluteScore,
                highestGrade: newMedal,
                highestCheckpoint: audit.checkpointReached ?? 0,
                highestStreak: audit.maxStreak,
                playedCount: 1,
                userId: user.id,
              },
              update: {
                normalizedScore: greater(
                  audit.score.normalizedScore,
                  oldScore?.normalizedScore ?? 0
                ),
                absoluteScore: greater(
                  audit.score.absoluteScore,
                  oldScore?.absoluteScore ?? 0
                ),
                highestGrade: newMedal,
                highestCheckpoint: greater(
                  audit.checkpointReached,
                  oldScore?.highestCheckpoint ?? 0
                ),
                highestStreak: greater(
                  audit.highestStreak,
                  oldScore?.highestStreak ?? 0
                ),
              },
              where: {
                userId_beatmapId: {
                  userId: user.id,
                  beatmapId: parseInt(audit.song_id),
                },
              },
            });

            // do we need to update the starCount?
            if (oldMedal !== newMedal) {
              const oldStarCount = medalToNormalStar(oldMedal);
              const newStarCount = medalToNormalStar(newMedal);

              let incrementCount = newStarCount - oldStarCount;
              if (incrementCount > 5) {
                incrementCount = 5;
              }

              await prisma.user.update({
                data: {
                  starCount: {
                    increment: incrementCount,
                  },
                },
                where: {
                  uuid: client.clide,
                },
              });
            }
          }
        }
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
  const prismaBeatmaps = await prisma.beatmap.findMany();
  const scores: Score[] = prismaBeatmaps.map(({ id }) => ({
    template_id: id,
    BragState: {},
    HighestScore: {},
    RewardSource: 1,
    Version: 1,
    PlayedCount: 0,
  }));

  // force play count for 99999 so we can quit songs and have swipes unlocked?
  scores.find((beatmap) => beatmap.template_id === 99999)!.PlayedCount = 10;

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

      const medal = scoreToMedal(score.absoluteScore, difficulty, false);
      if (medal === undefined || medal === null) {
        continue;
      }

      beatmap.HighestCheckpoint = score.highestCheckpoint;
      beatmap.HighestStreak = score.highestStreak;
      beatmap.HighestGrade_id = beatmap.PlayedCount = score.playedCount;
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
  const user = await prisma.user.findFirst({
    where: {
      uuid: clide,
    },
  });

  if (!user) {
    return null;
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
