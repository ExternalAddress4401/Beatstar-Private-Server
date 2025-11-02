import { Prisma } from "@prisma/client";
import Logger from "../lib/Logger";
import { PrismaInstance } from "../website/beatstar/src/lib/prisma";

export const getUser = async <T extends Prisma.UserSelect>(
  prisma: PrismaInstance,
  clide: string,
  selectFields: T
) => {
  const user = await prisma.user.findFirst({
    select: selectFields,
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
