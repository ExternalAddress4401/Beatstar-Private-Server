import type { Actions } from './$types';
import { zfd } from 'zod-form-data';
import argon2 from '@node-rs/argon2';
import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import crypto from 'crypto';

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
				id: true,
				username: true,
				password: true,
				uuid: true,
				admin: true
			},
			where: {
				username: username.toLowerCase()
			}
		});

		if (user === null) {
			return fail(400, { error: 'Username or password are incorrect.' });
		}

		if (!(await argon2.verify(user.password, password))) {
			return fail(400, { error: 'Username or password are incorrect.' });
		}

		const sessionId = crypto.randomBytes(18).toString('hex');

		await prisma.user.update({
			data: {
				sessionId
			},
			where: {
				id: user.id
			}
		});

		// user is authenticated
		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: ONE_DAY
		});

		return redirect(303, '/profile');
	}
} satisfies Actions;
