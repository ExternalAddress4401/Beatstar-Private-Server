import { Client } from "../Client";
import { Score } from "../interfaces/Score";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { ExecuteSharplaAuditReq } from "../protobuf/protos/ExecuteSharplaAuditReq";
import { ExecuteSharplaAuditResp } from "../protobuf/protos/ExecuteSharplaAuditResp";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import { SyncReq } from "../protobuf/protos/SyncReq";
import { SyncResp } from "../protobuf/protos/SyncResp";
import { createEmptyResponses } from "../protobuf/utils";
import { greater } from "../utilities/greater";
import { scoreToMedal } from "../utilities/scoreToMedal";
import prisma from "../website/beatstar/src/lib/prisma";
import { BaseService } from "./BaseService";

const RpcType = {
  5: "Sync",
  28: "ExecuteAudit",
} as const;

const BatchRequest = createBatchRequest({
  5: SyncReq,
  28: ExecuteSharplaAuditReq,
});

export class GameService extends BaseService {
  name = "gameservice";

  async handlePacket(packet: Packet, client: Client) {
    const payload = packet.parsePayload(PartialReq);
    const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
      Number(payload.requests[0].rpcType)
    ];
    const parsedPayload = packet.parsePayload(BatchRequest);

    if (rpcType === "Sync") {
      const parsedPayload = packet.parsePayload(SyncReq);

      const clide = parsedPayload.requests[0].body[0].session[0].clide;

      const user = await prisma.user.findFirst({
        select: {
          username: true,
          Score: true,
        },
        where: {
          uuid: clide,
        },
      });

      if (!user) {
        // TODO: do something real here
        throw new Error("No user found!");
      }

      const prismaBeatmaps = await prisma.beatmap.findMany();
      const scores: Score[] = prismaBeatmaps.map(({ id }) => ({
        template_id: id,
        BragState: {},
        HighestScore: {},
        RewardSource: 1,
        Version: 1,
        PlayedCount: 0,
      }));

      // force play count for 9999 so we can quit songs...
      scores.find((beatmap) => beatmap.template_id === 99999)!.PlayedCount = 2;

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
          beatmap.HighestGrade_id = medal;
          beatmap.PlayedCount = score.playedCount;
          beatmap.absoluteScore = score.absoluteScore;
        }
      }

      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "SyncResp",
        SyncResp,
        {
          "{username}": user?.username,
          "{beatmaps}": scores,
        },
        true
      );
      client.write(response);
    } else if (rpcType === "ExecuteAudit") {
      const parsedPayload = packet.parsePayload(ExecuteSharplaAuditReq);

      if (!client.clide) {
        // this should be set before getting here...
        Logger.error("Got gameservice request for client without a clide.");
        return;
      }

      for (const request of parsedPayload.requests) {
        const audit = request.body[0].audit[0];
        if (audit.type === 12) {
          const score = audit.audit[0];

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
              id: parseInt(score.song_id),
            },
          });

          if (beatmap === null) {
            Logger.error(`Unknown beatmap provided: ${score.song_id}`);
            return;
          }

          // this is only used in the update so a score definitely exists
          const oldScore = (await prisma.score.findFirst({
            where: {
              userId: user.id,
              beatmapId: parseInt(score.song_id),
            },
          }))!;

          const medal = scoreToMedal(
            score.score[0].absoluteScore,
            beatmap.difficulty,
            false
          );

          if (medal === null || medal === undefined) {
            Logger.error(`Invalid difficulty provided: ${beatmap.difficulty}`);
            return;
          }

          if (
            !oldScore ||
            oldScore.absoluteScore < score.score[0].absoluteScore
          ) {
            console.log("Score update!");
            await prisma.score.upsert({
              create: {
                beatmapId: parseInt(score.song_id),
                normalizedScore: score.score[0].normalizedScore,
                absoluteScore: score.score[0].absoluteScore,
                highestGrade: medal,
                highestCheckpoint: score.checkpointReached ?? 0,
                highestStreak: score.maxStreak,
                playedCount: 1,
                userId: user.id,
              },
              update: {
                normalizedScore: greater(
                  score.score[0].normalizedScore,
                  oldScore?.normalizedScore
                ),
                absoluteScore: greater(
                  score.score[0].absoluteScore,
                  oldScore?.absoluteScore
                ),
                highestGrade: medal,
                highestCheckpoint: greater(
                  score.checkpointReached,
                  oldScore?.highestCheckpoint
                ),
                highestStreak: greater(
                  score.highestStreak,
                  oldScore?.highestStreak
                ),
                playedCount: oldScore?.playedCount + 1 || 1,
              },
              where: {
                userId_beatmapId: {
                  userId: user.id,
                  beatmapId: parseInt(score.song_id),
                },
              },
            });
          }
        }
      }

      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "ExecuteSharplaAuditResp",
        ExecuteSharplaAuditResp,
        {
          "{requests}": createEmptyResponses(parsedPayload.requests),
        }
      );
      client.write(response);
    }
  }
}
