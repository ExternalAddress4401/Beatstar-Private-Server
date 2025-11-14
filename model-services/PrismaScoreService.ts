import Logger from "../lib/Logger";
import {
  isNewMedalBetter,
  medalToNormalStar,
  scoreToMedal,
} from "../utilities/scoreToMedal";
import { PrismaInstance } from "../website/beatstar/src/lib/prisma";
import { getBeatmap } from "./PrismaBeatmapService";

export const getScore = async (
  prisma: PrismaInstance,
  userId: number,
  beatmapId: number,
  isCustomScore: boolean
) => {
  if (isCustomScore) {
    return prisma.customScore.findFirst({
      where: {
        userId,
      },
    });
  } else {
    return prisma.score.findFirst({
      where: {
        userId,
        beatmapId,
      },
    });
  }
};

export const tryToUpdateScore = async (
  prisma: PrismaInstance,
  userId: number,
  audit: any
) => {
  const beatmap = await getBeatmap(prisma, audit.song_id);
  const difficulty = beatmap?.difficulty ?? audit.difficulty;
  const isDeluxe = beatmap?.deluxe ?? audit.isDeluxe;
  let isCustom = beatmap === null;

  if (isCustom && (!audit.difficulty || !audit.isDeluxe)) {
    Logger.info(`Not inserting score for ${beatmap?.id}`);
  }

  // this is only used in the update so a score definitely exists
  const oldScore = await getScore(prisma, userId, audit.song_id, isCustom);

  const oldMedal = scoreToMedal(oldScore?.absoluteScore, difficulty, isDeluxe);

  const newMedal = scoreToMedal(
    audit.score.absoluteScore,
    difficulty,
    isDeluxe
  );

  if (newMedal === null || newMedal === undefined) {
    Logger.error(`Invalid difficulty provided: ${difficulty}`);
    return null;
  }

  if (!oldScore || oldScore.absoluteScore < audit.score.absoluteScore) {
    const params = {
      create: {
        beatmapId: parseInt(audit.song_id),
        normalizedScore: audit.score.normalizedScore ?? 0,
        absoluteScore: audit.score.absoluteScore ?? 0,
        highestGrade: newMedal,
        highestCheckpoint: audit.checkpointReached ?? 0,
        highestStreak: audit.maxStreak ?? 0,
        playedCount: 1,
        userId: userId,
      },
      update: {
        normalizedScore: Math.max(
          audit.score.normalizedScore,
          oldScore?.normalizedScore ?? 0
        ),
        absoluteScore: Math.max(
          audit.score.absoluteScore,
          oldScore?.absoluteScore ?? 0
        ),
        highestGrade: newMedal,
        highestCheckpoint: Math.max(
          audit.checkpointReached,
          oldScore?.highestCheckpoint ?? 0
        ),
        highestStreak: Math.max(
          audit.highestStreak,
          oldScore?.highestStreak ?? 0
        ),
      },
      where: {
        userId_beatmapId: {
          userId: userId,
          beatmapId: parseInt(audit.song_id),
        },
      },
    };
    if (isCustom) {
      await prisma.customScore.upsert(params);
    } else {
      await prisma.score.upsert(params);
    }
  }

  // do we need to update the starCount?
  if (!isCustom) {
    if (isNewMedalBetter(oldMedal, newMedal, beatmap.deluxe)) {
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
          id: userId,
        },
      });
    }
  }
};
