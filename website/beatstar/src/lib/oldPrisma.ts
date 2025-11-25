import { PrismaClient } from '@prisma-app/client';

const oldPrisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.OLD_DATABASE_URL
		}
	}
});

export default oldPrisma;
