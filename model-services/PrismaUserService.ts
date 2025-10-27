import Logger from "../lib/Logger";
import { PrismaInstance } from "../website/beatstar/src/lib/prisma";

export const getUser = async (prisma: PrismaInstance, clide: string) => {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
    },
    where: {
      uuid: clide,
    },
  });

  if (user === null) {
    Logger.error(`Failed to find user for clide: ${clide}`);
    return null;
  }

  return user;
};
