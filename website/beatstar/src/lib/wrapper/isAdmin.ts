import prisma from '$lib/prisma';
import type { User } from '@prisma/client';
import { fail, type Cookies } from '@sveltejs/kit';

type ActionFn = (args: { request: Request; cookies: Cookies; user: User }) => Promise<any>;

export function isAdmin(
	action: ActionFn
): (args: { request: Request; cookies: Cookies }) => Promise<any> {
	return async ({ request, cookies }) => {
		const sessionCookie = cookies.get('session');

		if (!sessionCookie) {
			return fail(401, { error: 'Not authenticated' });
		}

		const user = await prisma.user.findUnique({
			where: {
				sessionId: sessionCookie
			}
		});

		if (!user) {
			return fail(401, { error: 'Invalid session' });
		}

		if (!user.admin) {
			return fail(403, { error: 'Requires admin priviliges.' });
		}

		return action({ request, cookies, user });
	};
}
