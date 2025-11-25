import type { Actions, PageServerLoad } from './$types';
import { zfd } from 'zod-form-data';
import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import { isAuthenticated } from '$lib/wrapper/isAuthenticated';
import { isAndroidId } from '$lib/utilities/isAndroidId';
import oldPrisma from '$lib/oldPrisma';
import { updateStarCount } from '$lib/services/UserService';
import { getFlags } from '$lib/featureFlags';

const uploadSchema = zfd.formData({
	profile: zfd.file()
});

const changeUsernameSchema = zfd.formData({
	username: zfd.text()
});

const importSchema = zfd.formData({
	uuid: zfd.file()
});

export const load: PageServerLoad = async () => {
	return {
		flags: await getFlags()
	};
};

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

		const uploadedScores =
			json.profile === undefined && json.beatmaps !== undefined
				? json.beatmaps.beatmaps
				: json.profile.beatmaps.beatmaps;

		if (!user) {
			return fail(500);
		}

		const uploadedBeatmapScores = uploadedScores.filter(
			(beatmap) => Object.keys(beatmap.HighestScore).length !== 0
		);

		const currentScores = await prisma.score.findMany({
			where: {
				beatmapId: {
					in: uploadedBeatmapScores.map((beatmap) =>
						beatmap.template_id ? beatmap.template_id : beatmap.templateId
					)
				},
				userId: user.id
			}
		});

		const scoresToAdd = [];
		const scoresToUpdate = [];

		for (const uploadedScore of uploadedBeatmapScores) {
			scoresToAdd.push(uploadedScore);
		}

		await prisma.score.createMany({
			data: scoresToAdd.map((score) => ({
				beatmapId: score.template_id ? score.template_id : score.templateId,
				normalizedScore: score.HighestScore.normalizedScore,
				absoluteScore: score.HighestScore.absoluteScore,
				highestGrade: score.HighestGrade_id ? score.HighestGrade_id : score.HighestGradeId,
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
					highestGrade: score.HighestGrade_id ? score.HighestGrade_id : score.HighestGradeId,
					highestCheckpoint: score.HighestCheckpoint,
					highestStreak: score.HighestStreak,
					playedCount: score.PlayedCount
				},
				where: {
					userId_beatmapId: {
						userId: user.id,
						beatmapId: score.template_id ? score.template_id : score.templateId
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

		const beatmaps = (await prisma.beatmap.findMany()).map((beatmap) => beatmap.id);

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

		// separate into custom songs and non custom songs
		const customScores = scoresToMigrate.filter((score) => !beatmaps.includes(score.beatmapId));
		const vanillaScores = scoresToMigrate.filter((score) => beatmaps.includes(score.beatmapId));

		// custom scores we can just import...
		const customInsertResult = await prisma.customScore.createMany({
			data: customScores.map((score) => ({
				beatmapId: score.beatmapId,
				absoluteScore: score.absoluteScore,
				userId: user.id
			})),
			skipDuplicates: true
		});

		// for vanilla scores we need to compare to what they already have...

		const scoresToAdd = [];
		const scoresToUpdate = [];

		for (const score of vanillaScores) {
			// do they already have a score for this song
			const oldScore = newScores.find((old) => old.beatmapId === score.beatmapId);
			if (!oldScore) {
				scoresToAdd.push(score);
			} else if (oldScore.absoluteScore < score.absoluteScore) {
				scoresToUpdate.push(score);
			}
		}

		await prisma.score.createMany({
			data: scoresToAdd.map((score) => ({
				...score,
				userId: user.id
			})),
			skipDuplicates: true
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
			scoresAdded: scoresToAdd.length + customInsertResult.count,
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
