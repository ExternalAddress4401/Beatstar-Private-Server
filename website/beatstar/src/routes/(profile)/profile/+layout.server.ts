import { redirect } from '@sveltejs/kit';
import { isRedirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const cookie = cookies.get('session');
	if (!cookie) {
		redirect(307, '/');
	}
	// check for old cookie format
	try {
		if (cookie) {
			JSON.parse(cookie);
			cookies.delete('session', { path: '/' });
			redirect(307, '/');
		}
	} catch (e) {
		if (isRedirect(e)) throw e;
	}

	const user = await prisma.user.findUnique({
		where: {
			sessionId: cookie
		}
	});

	return {
		user
	};
};
