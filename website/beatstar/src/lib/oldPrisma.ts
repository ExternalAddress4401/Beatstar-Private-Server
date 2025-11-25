import { PrismaClient } from '$lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const oldPrisma = new PrismaClient({
	adapter: new PrismaPg({
		connectionString: process.env.OLD_DATABASE_URL
	})
});

export default oldPrisma;
