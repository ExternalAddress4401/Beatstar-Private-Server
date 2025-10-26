import prisma from '../../src/lib/prisma.js';
import argon2 from '@node-rs/argon2';

export const seed = async () => {
	const user = {
		id: 1,
		uuid: '795b281a-ffa9-4d91-9042-eb7bae4c852e',
		username: 'test',
		password: await argon2.hash('test'),
		admin: true,
		starCount: 0
	};
	await prisma.user.create({
		data: user
	});
};
