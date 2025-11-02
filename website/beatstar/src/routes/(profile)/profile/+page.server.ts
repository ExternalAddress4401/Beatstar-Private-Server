import type { Actions } from './$types';
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

export const actions = {
	unlockAllSongs: isAuthenticated(async ({ user }) => {
		await prisma.user.update({
			data: {
				unlockAllSongs: !user.unlockAllSongs
			},
			where: {
				id: user.id
			}
		});

		return { success: true };
	}),
	restore: isAuthenticated(async ({ request, user }) => {
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
				},
				userId: user.id
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
				userId: user.id
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
						userId: user.id,
						beatmapId: score.template_id
					}
				}
			});
		}

		await updateStarCount(prisma, user.id);

		return {
			success: true,
			scoresAdded: scoresToAdd.length,
			id: 'restore'
		};
	}),
	changeUsername: isAuthenticated(async ({ request, user }) => {
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
			return fail(409, { error: 'Someone already has this username.', id: 'changeUsername' });
		}

		await prisma.user.update({
			data: {
				username
			},
			where: {
				id: user.id
			}
		});

		return { success: true, id: 'changeUsername' };
	}),
	import: isAuthenticated(async ({ request, user }) => {
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
				userId: user.id
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
				userId: user.id
			}))
		});

		await prisma.customScore.createMany({
			data: customScoresToAdd.map((score) => ({
				...score,
				userId: user.id
			}))
		});

		for (const scoreToUpdate of scoresToUpdate) {
			await prisma.score.update({
				data: {
					absoluteScore: scoreToUpdate.absoluteScore
				},
				where: {
					userId_beatmapId: {
						userId: user.id,
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
	updateStarCount: isAuthenticated(async ({ user }) => {
		const newStarCount = await updateStarCount(prisma, user.id);

		return {
			success: true,
			newStarCount,
			id: 'updateStarCount'
		};
	})
} satisfies Actions;
