import { promises as fs } from 'fs';
import prisma from '../../src/lib/prisma.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seed = async () => {
	const article = JSON.parse(await fs.readFile(path.join(__dirname, 'files/news.json'), 'utf8'));

	const image = article.image[0];
	const prismaImage = await prisma.image.create({
		data: {
			id: image.id,
			url: image.url,
			width: image.width,
			height: image.height,
			rectWidth: image.rect[0].width,
			rectHeight: image.rect[0].height
		}
	});

	await prisma.news.create({
		data: {
			type: article.type,
			legacyId: article.legacyId,
			viewType: article.viewType.toUpperCase(),
			startTimeMsecs: new Date(article.startTimeMsecs),
			endTimeMsecs: new Date(article.endTimeMsecs),
			order: article.order,
			title: article.title,
			status: article.status,
			id: article.id,
			content: article.requirements[0].content,
			requirements: article.requirements[0].requirements[0],
			imageId: prismaImage.id
		}
	});
};
