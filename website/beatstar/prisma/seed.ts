import prisma from '../src/lib/prisma.js';
import { seed as beatmaps } from './seeds/beatmaps.js';

async function main() {
	beatmaps();
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
