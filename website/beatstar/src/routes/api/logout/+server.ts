import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	cookies.delete('session', { path: '/' });
	return redirect(303, '/');
};
