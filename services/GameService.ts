import { Client } from "../Client";
import { Score } from "../interfaces/Score";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { ExecuteSharplaAuditReq } from "../protobuf/protos/ExecuteSharplaAuditReq";
import { ExecuteSharplaAuditResp } from "../protobuf/protos/ExecuteSharplaAuditResp";
import { SyncReq, SyncReqEnum } from "../protobuf/protos/SyncReq";
import { SyncResp } from "../protobuf/protos/SyncResp";
import { greater } from "../utilities/greater";
import { scoreToMedal } from "../utilities/scoreToMedal";
import { toArray } from "../utilities/toArray";
import prisma from "../website/beatstar/src/lib/prisma";
import { BaseService } from "./BaseService";

const RpcType = {
  5: "Sync",
  28: "ExecuteAudit",
} as const;

const BatchRequest = createBatchRequest({
  5: SyncReqEnum,
  28: ExecuteSharplaAuditReq,
});

export class GameService extends BaseService {
  name = "gameservice";

  async handlePacket(packet: Packet, client: Client) {
    const parsedPayload = packet.parsePayload(BatchRequest);

    const requests = toArray(parsedPayload.requests);
    if (requests.length === 1) {
      const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
        Number(requests[0].rpcType)
      ];
      if (rpcType === "Sync") {
        const parsedPayload = packet.parsePayload(SyncReq);

        const clide = parsedPayload.requests.body.session.clide;

        console.log(clide);

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
          },
          where: {
            uuid: clide,
          },
        });

        console.log(user);

        if (!user) {
          // TODO: do something real here
          const response = await packet.buildErrorResponse(
            "ServerClientMessageHeader",
            "SyncResp",
            SyncResp
          );
          client.write(response);
          return;
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
        scores.find(
          (beatmap) => beatmap.template_id === 99999
        )!.PlayedCount = 2;

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
        return;
      }
    }

    const responses = [];

    for (const request of requests) {
      const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
        Number(request.rpcType)
      ];

      if (rpcType === "ExecuteAudit") {
        const parsedPayload = packet.parsePayload(ExecuteSharplaAuditReq);

        if (!client.clide) {
          // this should be set before getting here...
          Logger.error("Got gameservice request for client without a clide.");
          return;
        }

        const audit = request.audit;

        if (audit.type === 12) {
          console.log("got a score!");
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
          const oldScore = (await prisma.score.findFirst({
            where: {
              userId: user.id,
              beatmapId: parseInt(audit.song_id),
            },
          }))!;

          const medal = scoreToMedal(
            audit.score[0].absoluteScore,
            beatmap.difficulty,
            false
          );

          if (medal === null || medal === undefined) {
            Logger.error(`Invalid difficulty provided: ${beatmap.difficulty}`);
            return;
          }

          console.log("wow a score!");

          if (
            !oldScore ||
            oldScore.absoluteScore < audit.score[0].absoluteScore
          ) {
            console.log("Score update!");
            await prisma.score.upsert({
              create: {
                beatmapId: parseInt(audit.song_id),
                normalizedScore: audit.score[0].normalizedScore,
                absoluteScore: audit.score[0].absoluteScore,
                highestGrade: medal,
                highestCheckpoint: audit.checkpointReached ?? 0,
                highestStreak: audit.maxStreak,
                playedCount: 1,
                userId: user.id,
              },
              update: {
                normalizedScore: greater(
                  audit.score[0].normalizedScore,
                  oldScore?.normalizedScore
                ),
                absoluteScore: greater(
                  audit.score[0].absoluteScore,
                  oldScore?.absoluteScore
                ),
                highestGrade: medal,
                highestCheckpoint: greater(
                  audit.checkpointReached,
                  oldScore?.highestCheckpoint
                ),
                highestStreak: greater(
                  audit.highestStreak,
                  oldScore?.highestStreak
                ),
                playedCount: oldScore?.playedCount + 1 || 1,
              },
              where: {
                userId_beatmapId: {
                  userId: user.id,
                  beatmapId: parseInt(audit.song_id),
                },
              },
            });
          }
        }
      }
    }

    console.log(responses);

    const response = await packet.buildResponse(
      "ServerClientMessageHeader",
      "ExecuteSharplaAuditResp",
      ExecuteSharplaAuditResp,
      {
        "{requests}": responses,
      }
    );
    client.write(response);
  }
}
