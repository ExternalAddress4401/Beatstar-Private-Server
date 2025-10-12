import type { Actions } from './$types';
import { zfd } from 'zod-form-data';
import argon2 from '@node-rs/argon2';
import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

const schema = zfd.formData({
	username: zfd.text(),
	password: zfd.text()
});

const ONE_DAY = 60 * 60 * 24;

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const response = await schema.safeParseAsync(data);
		if (response.error) {
			return fail(400);
		}

		const { username, password } = response.data;

		const user = await prisma.user.findFirst({
			select: {
				username: true,
				password: true,
				uuid: true
			},
			where: {
				username
			}
		});

		if (user === null) {
			return fail(400, { error: 'Username or password are incorrect.' });
		}

		if (!(await argon2.verify(user.password, password))) {
			return fail(400, { error: 'Username or password are incorrect.' });
		}

		// user is authenticated
		cookies.set('session', JSON.stringify({ username, uuid: user.uuid }), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: ONE_DAY
		});

		return redirect(303, '/profile');
	}
} satisfies Actions;
