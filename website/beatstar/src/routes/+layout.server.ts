import prisma from '$lib/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const session = cookies.get('session');
	if (!session) {
		return null;
	}

	const user = await prisma.user.findUnique({
		where: {
			sessionId: session
		}
	});

	return {
		user
	};
};
