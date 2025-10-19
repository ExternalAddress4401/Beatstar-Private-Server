import { fail, type Cookies } from '@sveltejs/kit';

type ActionFn = (args: { request: Request; cookies: Cookies }) => Promise<any>;

export function isAuthenticated(action: ActionFn): ActionFn {
	return async ({ request, cookies }) => {
		const session = cookies.get('session');

		if (!session) {
			return fail(401, { error: 'Not authenticated' });
		}

		return action({ request, cookies });
	};
}
