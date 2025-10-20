import prisma from '../../src/lib/prisma.js';
import argon2 from '@node-rs/argon2';
import crypto from 'crypto';

export const seed = async () => {
	const user = {
		id: 1,
		uuid: crypto.randomUUID(),
		username: 'test',
		password: await argon2.hash('test'),
		admin: true,
		starCount: 0
	};
	await prisma.user.create({
		data: user
	});
};
