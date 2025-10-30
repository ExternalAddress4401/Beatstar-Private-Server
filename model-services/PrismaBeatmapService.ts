import Logger from "../lib/Logger";
import { PrismaInstance } from "../website/beatstar/src/lib/prisma";

export const getBeatmap = async (prisma: PrismaInstance, beatmapId: number) => {
  if (beatmapId > 2147483647) {
    return null;
  }
  const beatmap = await prisma.beatmap.findFirst({
    where: {
      id: beatmapId,
    },
  });

  if (!beatmap === null) {
    Logger.error(`Failed to find beatmap with ID: ${beatmapId}`);
    return null;
  }

  return beatmap;
};
