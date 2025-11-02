import type { PrismaInstance } from '$lib/prisma';
import { scoreToNormalStar } from '$lib/utilities/scoreToMedal';

export const updateStarCount = async (prisma: PrismaInstance, id: number) => {
	const user = await prisma.user.findFirst({
		include: {
			Score: true
		},
		where: {
			id
		}
	});

	if (!user) {
		return;
	}

	const beatmaps = await prisma.beatmap.findMany({
		where: {
			id: {
				in: user?.Score.map((score) => score.beatmapId)
			}
		}
	});

	const relevantScores = user.Score.filter((score) =>
		beatmaps.find((beatmap) => beatmap.id === score.beatmapId)
	);

	const starCount = relevantScores.reduce((prev, curr) => {
		const beatmap = beatmaps.find((beatmap) => beatmap.id === curr.beatmapId);
		if (!beatmap) {
			console.error(`Couldn't find beatmap with ID: ${curr.beatmapId}`);
			return 0;
		}
		return prev + scoreToNormalStar(curr.absoluteScore, beatmap?.difficulty, beatmap?.deluxe);
	}, 0);

	await prisma.user.update({
		data: {
			starCount
		},
		where: {
			id
		}
	});

	return starCount;
};
