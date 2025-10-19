import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const cms = await prisma.cms.findMany({
		select: {
			name: true
		}
	});

	return {
		cms
	};
};
