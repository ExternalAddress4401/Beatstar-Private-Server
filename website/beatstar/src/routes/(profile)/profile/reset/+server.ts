import prisma from '$lib/prisma.js';
import { error, json } from '@sveltejs/kit';

export async function POST({ request }) {
	const body = await request.json();
	if (body.uuid === undefined) {
		return error(400, 'Missing uuid.');
	}

	const user = await prisma.user.findUnique({
		where: {
			uuid: body.uuid
		}
	});

	if (user === null) {
		return error(404, 'No user found.');
	}

	await prisma.$transaction([
		prisma.score.deleteMany({
			where: {
				userId: user.id
			}
		}),
		prisma.user.update({
			data: {
				starCount: 0
			},
			where: {
				id: user.id
			}
		})
	]);

	return json({});
}
