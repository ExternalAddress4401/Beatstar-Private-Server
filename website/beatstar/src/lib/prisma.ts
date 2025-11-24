import { PrismaClient } from '@prisma-app/client';

const prisma = new PrismaClient();
export default prisma;

export type PrismaInstance = typeof prisma;
