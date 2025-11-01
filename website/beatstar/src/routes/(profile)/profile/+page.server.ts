import type { Actions } from './$types';
import { zfd } from 'zod-form-data';
import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import { isAuthenticated } from '$lib/wrapper/isAuthenticated';
import { isAndroidId } from '$lib/utilities/isAndroidId';
import oldPrisma from '$lib/oldPrisma';

const uploadSchema = zfd.formData({
	profile: zfd.file()
});

const changeUsernameSchema = zfd.formData({
	username: zfd.text()
});

const importSchema = zfd.formData({
	uuid: zfd.file()
});

export const actions = {
	upload: async ({ request, cookies }) => {
		const session = cookies.get('session');
		if (!session) {
			return fail(401);
		}

		const uuid = JSON.parse(session).uuid;

		const data = await request.formData();

		const response = await uploadSchema.safeParseAsync(data);
		if (response.error) {
			return fail(400);
		}

		const { profile } = response.data;

		const json = JSON.parse(Buffer.from(await profile.arrayBuffer()).toString());

		const scores = json.profile.beatmaps.beatmaps;
		const user = await prisma.user.findFirst({
			select: {
				id: true
			},
			where: {
				uuid
			}
		});

		if (!user) {
			return fail(500);
		}

		const relevantBeatmaps = scores.filter(
			(beatmap) => Object.keys(beatmap.HighestScore).length !== 0
		);

		await prisma.score.createMany({
			data: relevantBeatmaps.map((score: any) => ({
				beatmapId: score.template_id,
				normalizedScore: score.HighestScore.normalizedScore,
				absoluteScore: score.HighestScore.absoluteScore,
				highestGrade: score.HighestGrade_id,
				highestCheckpoint: score.HighestCheckpoint,
				highestStreak: score.HighestStreak,
				playedCount: score.PlayedCount,
				userId: user.id
			}))
		});

		return { success: true };
	},
	changeUsername: async ({ request, cookies }) => {
		const session = cookies.get('session');
		if (!session) {
			return fail(401);
		}

		const uuid = JSON.parse(session).uuid;
		const data = await request.formData();

		const response = await changeUsernameSchema.safeParseAsync(data);
		if (response.error) {
			return fail(400);
		}

		const { username } = response.data;

		const existingUser = await prisma.user.findFirst({
			where: {
				username
			}
		});

		if (existingUser) {
			return fail(409, { error: 'Username already exists.' });
		}

		await prisma.user.update({
			data: {
				username
			},
			where: {
				uuid
			}
		});

		return { success: true };
	},
	import: isAuthenticated(async ({ request, session }) => {
		const data = await request.formData();
		const response = await importSchema.safeParseAsync(data);
		if (response.error) {
			return fail(400);
		}

		const body = response.data.uuid;
		const beatcloneAndroidId = Buffer.from(await body.arrayBuffer())
			.toString()
			.trim();

		if (!isAndroidId(beatcloneAndroidId)) {
			return fail(400, { error: 'Invalid android ID.' });
		}

		const scoresToMigrate = (
			await oldPrisma.$queryRaw`SELECT * FROM "Score" as s JOIN "User" as u ON s."userId" = u."userId" WHERE "androidId" = ${beatcloneAndroidId}`
		).map((score) => ({
			beatmapId: score.beatmapId,
			absoluteScore: score.score
		}));

		const newScores = await prisma.score.findMany({
			where: {
				userId: session.id
			}
		});

		const scoresToAdd = [];
		const scoresToUpdate = [];

		for (const score of scoresToMigrate) {
			const newScore = newScores.find((newScore) => score.beatmapId === newScore.beatmapId);
			if (newScore && newScore.absoluteScore < score.absoluteScore) {
				scoresToUpdate.push(score);
			} else if (!newScore) {
				scoresToAdd.push(score);
			}
		}

		await prisma.score.createMany({
			data: scoresToAdd.map((score) => ({
				...score,
				userId: session.id
			}))
		});

		for (const scoreToUpdate of scoresToUpdate) {
			await prisma.score.update({
				data: {
					absoluteScore: scoreToUpdate.absoluteScore
				},
				where: {
					userId_beatmapId: {
						userId: session.id,
						beatmapId: scoreToUpdate.beatmapId
					}
				}
			});
		}

		return {
			success: true,
			scoresAdded: scoresToAdd.length,
			scoresUpdated: scoresToUpdate.length,
			id: 'import'
		};
	})
} satisfies Actions;
