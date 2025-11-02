import type { Handle } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	const user = await prisma.user.findFirst({
		where: {
			sessionId: session
		}
	});

	event.locals.user = user;

	return resolve(event);
};
