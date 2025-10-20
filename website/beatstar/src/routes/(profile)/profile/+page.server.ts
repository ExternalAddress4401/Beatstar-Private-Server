import type { Actions } from './$types';
import { zfd } from 'zod-form-data';
import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';

const uploadSchema = zfd.formData({
	profile: zfd.file()
});

const changeUsernameSchema = zfd.formData({
	username: zfd.text()
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
				highestCheckpoint: score.HighestCheckPoint ?? 0,
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
	}
} satisfies Actions;
