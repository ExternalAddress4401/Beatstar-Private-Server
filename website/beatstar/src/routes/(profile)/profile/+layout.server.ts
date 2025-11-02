import { redirect } from '@sveltejs/kit';
import { isRedirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const cookie = cookies.get('session');
	if (!cookie) {
		redirect(307, '/');
	}
	try {
		if (cookie) {
			JSON.parse(cookie);
			cookies.delete('session', { path: '/' });
			redirect(307, '/');
		}
	} catch (e) {
		if (isRedirect(e)) throw e;
	}
	return {
		user: locals.user
	};
};
