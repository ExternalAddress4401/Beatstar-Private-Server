import { createBatchRequest } from "@externaladdress4401/protobuf/protos/BatchRequest";
import { Client, ClientWithExistingUser } from "../Client";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { scoreToMedal, scoreToNormalStar } from "../utilities/scoreToMedal";
import { toArray } from "../utilities/toArray";
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
import { createEmptyResponse } from "@externaladdress4401/protobuf/utils";
import { tryToUpdateScore } from "../model-services/PrismaScoreService";
import { Score } from "../interfaces/Score";
import { Difficulty } from "../interfaces/Difficulty";
import { isUUID } from "../utilities/isUuid";
import prisma from "../lib/prisma";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaClientKnownRequestError } from "../lib/generated/prisma/internal/prismaNamespace";

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
      Logger.saveClientError(
        "Unable to parse GameService request",
        { buffer: packet.buffer.toString("hex") },
        client.user.clide
      );
      return;
    }

    // if the server resets for any reason we'll lose the ID here
    // so we should check for it again
    if (!client.hasUserId() && isUUID(packet.header.clide)) {
      Logger.error("Client has no user ID.");
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          uuid: true,
        },
        where: {
          uuid: packet.header.clide,
        },
      });
      if (user === null) {
        Logger.error("Tried to find user after crash but failed");
        return;
      } else {
        client.setUser(user.id, user.uuid);
        Logger.info("Reset user ID.");
      }
    }

    // now that we tried to fix it above lets see if we can pass now
    if (!client.hasUserId() && isUUID(packet.header.clide)) {
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
        Logger.info("Clide " + clide);

        // the user has no profile file on their device
        if (!isUUID(clide)) {
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

        if (user === null) {
          // there's no user in the database matching our user file
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

        const newsArticles = await fetchNewsArticles(prisma);
        const scores = await fetchScores(
          prisma,
          client,
          user.selectedBeatmapId,
          user.unlockAllSongs
        );

        let starCount = user.starCount || 1;

        if (!user.unlockAllSongs) {
          const score = scores[0];
          if (score !== undefined) {
            const singleBeatmap = await prisma.beatmap.findFirst({
              where: {
                id: score.template_id,
              },
            });
            if (singleBeatmap && score.HighestScore) {
              starCount = scoreToNormalStar(
                score.HighestScore.absoluteScore,
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

        if (!client.hasUserId()) {
          Logger.error("Client has no user ID.");
          return;
        }

        if (audit.type === RequestType.SetSelectedSong) {
          await setSelectedSong(prisma, client, audit.song_id);
        }
        if (audit.type === RequestType.RhythmGameStarted) {
          await updatePlayCount(prisma, client, audit.song_id);
        } else if (audit.type === RequestType.RhythmGameEnded) {
          tryToUpdateScore(prisma, client, audit);
        } else if (audit.type == RequestType.SetCustomization) {
          if (audit.Data === undefined) {
            Logger.saveClientError(
              "Audit data was undefined",
              { audit },
              client.user.clide
            );
            break;
          }
          await setCustomization(client, audit.Data);
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

async function fetchScores(
  prisma: PrismaClient,
  client: ClientWithExistingUser,
  selectedBeatmapId: number,
  unlockAllSongs: boolean
) {
  const prismaScores = unlockAllSongs
    ? await prisma.score.findMany({
        where: {
          userId: client.user.id,
        },
      })
    : await prisma.score.findMany({
        where: {
          userId: client.user.id,
          beatmapId: selectedBeatmapId,
        },
      });

  Logger.saveClientInfo(
    "Unlock all songs status",
    { unlockAllSongs },
    client.user.clide
  );

  const prismaBeatmaps = unlockAllSongs
    ? await prisma.beatmap.findMany()
    : await prisma.beatmap.findMany({
        where: {
          id: selectedBeatmapId,
        },
      });

  const createdScores: Score[] = prismaBeatmaps.map(({ id }) => ({
    template_id: id,
    BragState: {},
    HighestScore: {},
    RewardSource: 1,
    Version: 1,
    PlayedCount: 0,
  }));

  // force play count to 10 so we can quit songs and have swipes unlocked
  if (unlockAllSongs) {
    createdScores.find(
      (beatmap) => beatmap.template_id === 99999
    )!.PlayedCount = 10;
  } else {
    createdScores.find(
      (beatmap) => beatmap.template_id === selectedBeatmapId
    )!.PlayedCount = 10;
  }

  for (const score of prismaScores) {
    const relevantBeatmap = prismaBeatmaps.find(
      (beatmap) => beatmap.id === score.beatmapId
    );
    if (relevantBeatmap === undefined) {
      Logger.saveClientError(
        "Relevant beatmap was undefined",
        { id: score.beatmapId },
        client.user.clide
      );
      break;
    }
    const difficulty = relevantBeatmap.difficulty as Difficulty;
    const beatmap = createdScores.find(
      (beatmap) => beatmap.template_id === score.beatmapId
    );
    if (beatmap === undefined) {
      Logger.saveClientError(
        "Beatmap was undefined",
        { id: score.beatmapId },
        client.user.clide
      );
      break;
    }

    beatmap.HighestScore = {
      normalizedScore: score.normalizedScore,
      absoluteScore: score.absoluteScore,
    };

    const medal = scoreToMedal(
      score.absoluteScore,
      difficulty,
      relevantBeatmap.deluxe
    );

    if (medal === null) {
      Logger.saveClientError(
        "Medal was null",
        {
          score: score.absoluteScore,
          difficulty,
          deluxe: relevantBeatmap.deluxe,
        },
        client.user.clide
      );
      continue;
    }

    beatmap.HighestCheckpoint = score.highestCheckpoint ?? 0;
    beatmap.HighestStreak = score.highestStreak ?? 0;
    beatmap.HighestGrade_id = medal;
    beatmap.PlayedCount = score.playedCount ?? 0;
    beatmap.absoluteScore = score.absoluteScore ?? 0;
  }

  return createdScores;
}

/**
 * Returns a list of articles we should show in game
 * @returns JSON representation of news articles
 */
async function fetchNewsArticles(prisma: PrismaClient) {
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

/**
 * Updates the play count of a beatmap
 * @param {PrismaClient} prisma DI instance of prisma
 * @param {Client} client instance of client object
 * @param {number} beatmapId ID of beatmap to update
 */
async function updatePlayCount(
  prisma: PrismaClient,
  client: ClientWithExistingUser,
  beatmapId: number
) {
  try {
    await prisma.score.update({
      data: {
        playedCount: { increment: 1 },
      },
      where: {
        userId_beatmapId: {
          userId: client.user.id,
          beatmapId,
        },
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code !== "P2025") {
        Logger.saveClientError(
          `${err.name}: ${err.message}`,
          { code: err.code },
          client.user.clide
        );
      }
    }
  }
}

const setSelectedSong = async (
  prisma: PrismaClient,
  client: ClientWithExistingUser,
  songId: number
) => {
  try {
    await prisma.user.update({
      data: {
        selectedBeatmapId: songId,
      },
      where: {
        id: client.user.id,
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2003") {
        // we tried to set a custom song as selected. Ignore it
        return;
      }
      Logger.saveClientError(
        `${err.name}: ${err.message}`,
        { code: err.code },
        client.user.clide
      );
    }
  }
};

const setCustomization = async (
  client: ClientWithExistingUser,
  {
    type,
    Enabled,
  }: {
    type: number;
    Enabled: boolean;
  }
) => {
  const enabled = Enabled ?? false;
  let fieldName: string | null = null;

  switch (type) {
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
    Logger.saveClientError(
      "Invalid customization provided",
      { type, Enabled },
      client.user.clide
    );
    return;
  }

  try {
    await prisma.user.update({
      data: {
        [fieldName]: enabled,
      },
      where: {
        id: client.user.id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      Logger.saveClientError(
        `${err.name}: ${err.message}`,
        {},
        client.user.clide
      );
    }
  }
};
