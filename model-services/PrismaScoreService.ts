import { ClientWithExistingUser } from "../Client";
import { CustomError } from "../errors/CustomError";
import { Difficulty } from "../interfaces/Difficulty";
import { ScoreAudit, scoreAuditSchema } from "../interfaces/ScoreAudit";
import { PrismaClient } from "../lib/generated/prisma/client";
import Logger from "../lib/Logger";
import {
  isNewMedalBetter,
  medalToNormalStar,
  scoreToMedal,
} from "../utilities/scoreToMedal";
import { stringify } from "../utilities/stringify";
import { getBeatmap } from "./PrismaBeatmapService";

export const getScore = async (
  prisma: PrismaClient,
  client: ClientWithExistingUser,
  beatmapId: number,
  isCustomScore: boolean
) => {
  if (isCustomScore) {
    return prisma.customScore.findFirst({
      where: {
        userId: client.user.id,
      },
    });
  } else {
    return prisma.score.findFirst({
      where: {
        userId: client.user.id,
        beatmapId,
      },
    });
  }
};

export const tryToUpdateScore = async (
  prisma: PrismaClient,
  client: ClientWithExistingUser,
  audit: ScoreAudit
) => {
  const result = await scoreAuditSchema.safeParseAsync(audit);
  if (result.error) {
    Logger.saveClientError(
      "Failed to parse audit",
      {
        audit: audit,
        strings: [result.error.message],
      },
      client.user.clide
    );
    return;
  }

  const parsedAudit = result.data;

  try {
    const beatmap = await getBeatmap(prisma, parsedAudit.song_id);
    if (beatmap === null) {
      // the script defines these custom attributes so we must be using a valid script
      if (
        parsedAudit.difficulty === undefined ||
        parsedAudit.isDeluxe === undefined
      ) {
        Logger.saveClientError(
          "Unable to insert custom song as custom parameters are missing",
          {},
          client.user.clide
        );
        return;
      }
    }

    const difficulty = (beatmap?.difficulty ??
      parsedAudit.difficulty) as Difficulty;
    if (difficulty === undefined) {
      Logger.saveClientError(
        "Unable to handle difficulty",
        {
          difficulty,
          beatmapDifficulty: beatmap?.difficulty,
          auditDifficulty: parsedAudit.difficulty,
        },
        client.user.clide
      );
      return;
    }
    const isDeluxe = beatmap?.deluxe ?? audit.isDeluxe;
    const isCustom = beatmap === null;

    const oldScore = await getScore(
      prisma,
      client,
      parsedAudit.song_id,
      isCustom
    );

    // if we don't have a score we can just insert it as it's the highest
    if (oldScore === null) {
      Logger.saveClientInfo(
        "User didn't have a score for this song yet",
        {
          beatmapId: parsedAudit.song_id,
          score: parsedAudit.score.absoluteScore,
          normalizedScore: parsedAudit.score.normalizedScore,
          difficulty,
          isDeluxe,
        },
        client.user.clide
      );
      const medal = scoreToMedal(
        parsedAudit.score.absoluteScore,
        difficulty,
        isDeluxe
      );
      if (medal === null) {
        Logger.saveClientError(
          `Difficulty not found in medal table`,
          { difficulty },
          client.user.clide
        );
        return;
      }
      const params = {
        data: {
          beatmapId: parsedAudit.song_id,
          normalizedScore: parsedAudit.score.normalizedScore ?? 0,
          absoluteScore: parsedAudit.score.absoluteScore ?? 0,
          highestGrade: medal,
          highestCheckpoint: parsedAudit.checkpointReached,
          highestStreak: parsedAudit.maxStreak,
          playedCount: 1,
          userId: client.user.id,
        },
      };
      if (beatmap !== null) {
        await prisma.score.create(params);
        await prisma.user.update({
          data: {
            starCount: {
              increment: medalToNormalStar(medal),
            },
          },
          where: {
            id: client.user.id,
          },
        });
      } else {
        await prisma.customScore.create(params);
      }
      return;
    }

    // we already have a score for this beatmap so we need to compare it to the old
    const oldMedal = scoreToMedal(oldScore.absoluteScore, difficulty, isDeluxe);
    const newMedal = scoreToMedal(
      parsedAudit.score.absoluteScore,
      difficulty,
      isDeluxe
    );

    if (oldMedal === null || newMedal === null) {
      Logger.saveClientError(
        `Difficulty not found in medal table`,
        { difficulty },
        client.user.clide
      );
      return null;
    }
    Logger.saveClientInfo(
      `Received score`,
      {
        beatmapId: parsedAudit.song_id,
        oldScore: oldScore.absoluteScore,
        newScore: parsedAudit.score.absoluteScore,
        oldMedal,
        newMedal,
      },
      client.user.clide
    );

    const params = {
      data: {
        normalizedScore: Math.max(
          parsedAudit.score.normalizedScore,
          oldScore?.normalizedScore ?? 0
        ),
        absoluteScore: Math.max(
          parsedAudit.score.absoluteScore,
          oldScore?.absoluteScore ?? 0
        ),
        highestGrade: newMedal,
        highestCheckpoint: Math.max(
          parsedAudit.checkpointReached,
          oldScore?.highestCheckpoint ?? 0
        ),
        highestStreak: Math.max(
          parsedAudit.highestStreak,
          oldScore?.highestStreak ?? 0
        ),
      },
      where: {
        userId_beatmapId: {
          userId: client.user.id,
          beatmapId: parsedAudit.song_id,
        },
      },
    };

    Logger.saveClientInfo("Score params", { params }, client.user.clide);

    if (oldScore.absoluteScore < parsedAudit.score.absoluteScore) {
      if (!isCustom) {
        Logger.saveClientInfo(
          `Updating vanilla score as it was better`,
          {},
          client.user.clide
        );
        await prisma.score.update(params);
      } else {
        Logger.saveClientInfo(
          `Updating custom score as it was better`,
          {},
          client.user.clide
        );
        await prisma.customScore.update(params);
      }
    }

    // do we need to update the starCount?
    if (!isCustom) {
      Logger.saveClientInfo(
        `Comparing medals`,
        { oldMedal, newMedal },
        client.user.clide
      );
      if (isNewMedalBetter(oldMedal, newMedal, beatmap.deluxe)) {
        Logger.saveClientInfo(
          `Updating as earned medal is better`,
          {},
          client.user.clide
        );
        const oldStarCount = medalToNormalStar(oldMedal);
        const newStarCount = medalToNormalStar(newMedal);
        Logger.saveClientInfo(
          `Star counts`,
          { oldStarCount, newStarCount },
          client.user.clide
        );
        if (oldStarCount === null || newStarCount === null) {
          Logger.saveClientError(
            `Star counts were null`,
            { oldStarCount, newStarCount },
            client.user.clide
          );
          return;
        }

        let incrementCount = newStarCount - oldStarCount;
        Logger.saveClientError(
          `Increment count`,
          { incrementCount },
          client.user.clide
        );
        if (incrementCount < 0) {
          Logger.saveClientError(
            `Star increment was less than 0`,
            { incrementCount },
            client.user.clide
          );
          return;
        }
        if (incrementCount > 5) {
          incrementCount = 5;
          Logger.saveClientInfo(
            `Normalized increment count`,
            { incrementCount },
            client.user.clide
          );
        }

        await prisma.user.update({
          data: {
            starCount: {
              increment: incrementCount,
            },
          },
          where: {
            id: client.user.id,
          },
        });
      }
    }
  } catch (err) {
    if (err instanceof CustomError) {
      Logger.saveClientError(
        `${err.name}: ${err.message}`,
        err.params,
        client.user.clide
      );
    } else if (err instanceof Error) {
      Logger.saveClientError(
        `${err.name}: ${err.message}`,
        {},
        client.user.clide
      );
    }
  }
};
