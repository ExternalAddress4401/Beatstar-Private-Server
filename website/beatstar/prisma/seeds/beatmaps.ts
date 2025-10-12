import { promises as fs } from 'fs';
import prisma from '../../src/lib/prisma.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seed = async () => {
	const ids = JSON.parse(await fs.readFile(path.join(__dirname, 'files/beatmaps.json'), 'utf8'));
	await prisma.beatmap.createMany({
		data: ids.map((beatmap) => ({
			id: parseInt(beatmap.id),
			idLabel: beatmap.idLabel,
			difficulty: parseInt(beatmap.difficulty) || 0,
			deluxe: beatmap.deluxe
		}))
	});
};
