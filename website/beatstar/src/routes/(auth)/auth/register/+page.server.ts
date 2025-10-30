import type { Actions } from './$types';
import { zfd } from 'zod-form-data';
import argon2 from '@node-rs/argon2';
import prisma from '$lib/prisma';
import crypto from 'crypto';
import { fail } from '@sveltejs/kit';

const schema = zfd.formData({
	username: zfd.text(),
	password: zfd.text(),
	verifyPassword: zfd.text()
});

export const actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const response = await schema.safeParseAsync(data);
		if (response.error) {
			console.error(response.error);
			return fail(400);
		}

		const username = response.data.username.trim();
		const { password, verifyPassword } = response.data;

		if (username.length < 3) {
			return fail(400, { error: 'Username must be at least 3 characters.' });
		}

		const existingUser = await prisma.user.findFirst({
			where: {
				username
			}
		});

		if (existingUser !== null) {
			return fail(409, { error: 'Username already exists.' });
		}

		if (password !== verifyPassword) {
			return fail(400, { error: 'Passwords do not match.' });
		}

		await prisma.user.create({
			data: {
				username,
				uuid: crypto.randomUUID(),
				password: await argon2.hash(password)
			}
		});

		return { success: true };
	}
} satisfies Actions;
