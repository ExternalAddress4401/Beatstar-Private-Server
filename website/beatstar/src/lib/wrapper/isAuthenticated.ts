import { fail, type Cookies } from '@sveltejs/kit';

type ActionFn = (args: {
	request: Request;
	cookies: Cookies;
	session: { id: number };
}) => Promise<any>;

export function isAuthenticated(
	action: ActionFn
): (args: { request: Request; cookies: Cookies }) => Promise<any> {
	return async ({ request, cookies }) => {
		const sessionCookie = cookies.get('session');

		if (!sessionCookie) {
			return fail(401, { error: 'Not authenticated' });
		}

		try {
			const session = JSON.parse(sessionCookie);
			return action({ request, cookies, session });
		} catch (error) {
			return fail(401, { error: 'Invalid session' });
		}
	};
}
