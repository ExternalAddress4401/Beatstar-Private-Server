import { promises as fs } from 'fs';
import prisma from '../../src/lib/prisma.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seed = async () => {
	const files = JSON.parse((await fs.readFile(path.join(__dirname, 'files/cms.json'))).toString());

	await prisma.cms.createMany({
		data: files.map((file) => ({
			name: file.name,
			data: file.data,
			gzip: Buffer.from(file.gzip),
			hash: file.hash
		}))
	});
};
