import { BeatmapIdInvalidError } from "../errors/BeatmapIdInvalidError";
import { Beatmap } from "../lib/generated/prisma/client";
import { PrismaInstance } from "../lib/prisma";
import { isBeatmapIdValid } from "../utilities/isBeatmapIdValid";

/**
 * Returns a beatmap from the database
 * @param {PrismaClient} prisma of prisma client
 * @param {number} beatmapId id of beatmap to find
 * @returns {Promise<Beatmap | null>} beatmap to find or null if not found
 */
export const getBeatmap = async (
  prisma: PrismaInstance,
  beatmapId: number
): Promise<Beatmap | null> => {
  if (!isBeatmapIdValid(beatmapId)) {
    throw new BeatmapIdInvalidError(`Beatmap ID is too large to be handled.`, {
      beatmapId,
    });
  }

  const beatmap = await prisma.beatmap.findFirst({
    where: {
      id: beatmapId,
    },
  });

  return beatmap;
};
