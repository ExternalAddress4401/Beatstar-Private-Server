import prisma from '../src/lib/prisma.js';
import { seed as beatmaps } from './seeds/beatmaps.js';
import { seed as cms } from './seeds/cms.js';
import { seed as news } from './seeds/news.js';
import { seed as user } from './seeds/user.js';

async function main() {
	await beatmaps();
	await cms();
	await user();
	await news();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
