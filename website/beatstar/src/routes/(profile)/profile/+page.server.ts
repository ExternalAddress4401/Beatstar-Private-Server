import type { Actions, PageServerLoad } from './$types';
import { zfd } from 'zod-form-data';
import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import { isAuthenticated } from '$lib/wrapper/isAuthenticated';
import { isAndroidId } from '$lib/utilities/isAndroidId';
import oldPrisma from '$lib/oldPrisma';
import { updateStarCount } from '$lib/services/UserService';

const uploadSchema = zfd.formData({
	profile: zfd.file()
});

const changeUsernameSchema = zfd.formData({
	username: zfd.text()
});

const importSchema = zfd.formData({
	uuid: zfd.file()
});

export const load: PageServerLoad = async ({ locals }) => {
	const user = await prisma.user.findUnique({
		where: {
			id: locals.user?.id
		}
	});

	return { starCount: user?.starCount };
};

export const actions = {
	restore: isAuthenticated(async ({ request, session }) => {
		const data = await request.formData();

		const response = await uploadSchema.safeParseAsync(data);
		if (response.error) {
			return fail(400);
		}

		const { profile } = response.data;

		let json;
		try {
			json = JSON.parse(Buffer.from(await profile.arrayBuffer()).toString());
		} catch (e) {
			return fail(400, {
				error: 'This file is not valid JSON. Upload your PROFILE file.',
				id: 'restore'
			});
		}

		const uploadedScores = json.profile.beatmaps.beatmaps;
		const user = await prisma.user.findFirst({
			select: {
				id: true
			},
			where: {
				id: session.id
			}
		});

		if (!user) {
			return fail(500);
		}

		const uploadedBeatmapScores = uploadedScores.filter(
			(beatmap) => Object.keys(beatmap.HighestScore).length !== 0
		);

		const currentScores = await prisma.score.findMany({
			where: {
				beatmapId: {
					in: uploadedBeatmapScores.map((beatmap) => beatmap.template_id)
				}
			}
		});

		const scoresToAdd = [];
		const scoresToUpdate = [];

		for (const uploadedScore of uploadedBeatmapScores) {
			const currentScore = currentScores.find(
				(score) => score.beatmapId === uploadedScore.template_id
			);
			if (currentScore === undefined) {
				scoresToAdd.push(uploadedScore);
			} else if (currentScore.absoluteScore < uploadedScore.HighestScore.absoluteScore) {
				scoresToUpdate.push(uploadedScore);
			}
		}

		await prisma.score.createMany({
			data: scoresToAdd.map((score) => ({
				beatmapId: score.template_id,
				normalizedScore: score.HighestScore.normalizedScore,
				absoluteScore: score.HighestScore.absoluteScore,
				highestGrade: score.HighestGrade_id,
				highestCheckpoint: score.HighestCheckpoint,
				highestStreak: score.HighestStreak,
				playedCount: score.PlayedCount,
				userId: session.id
			}))
		});

		for (const score of scoresToUpdate) {
			await prisma.score.update({
				data: {
					normalizedScore: score.HighestScore.normalizedScore,
					absoluteScore: score.HighestScore.absoluteScore,
					highestGrade: score.HighestGrade_id,
					highestCheckpoint: score.HighestCheckpoint,
					highestStreak: score.HighestStreak,
					playedCount: score.PlayedCount
				},
				where: {
					userId_beatmapId: {
						userId: session.id,
						beatmapId: score.template_id
					}
				}
			});
		}

		await updateStarCount(prisma, session.id);

		return {
			success: true,
			scoresAdded: scoresToAdd.length,
			id: 'restore'
		};
	}),
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

		const beatmaps = await prisma.beatmap.findMany();

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
		const customScoresToAdd = [];

		for (const score of scoresToMigrate) {
			const beatmap = beatmaps.find((beatmap) => beatmap.id === score.beatmapId);
			if (!beatmap) {
				customScoresToAdd.push(score);
			} else {
				const newScore = newScores.find((newScore) => score.beatmapId === newScore.beatmapId);
				if (newScore && newScore.absoluteScore < score.absoluteScore) {
					scoresToUpdate.push(score);
				} else if (!newScore) {
					scoresToAdd.push(score);
				}
			}
		}

		await prisma.score.createMany({
			data: scoresToAdd.map((score) => ({
				...score,
				userId: session.id
			}))
		});

		await prisma.customScore.createMany({
			data: customScoresToAdd.map((score) => ({
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
	}),
	updateStarCount: isAuthenticated(async ({ session }) => {
		const newStarCount = await updateStarCount(prisma, session.id);

		return {
			success: true,
			newStarCount,
			id: 'updateStarCount'
		};
	})
} satisfies Actions;
