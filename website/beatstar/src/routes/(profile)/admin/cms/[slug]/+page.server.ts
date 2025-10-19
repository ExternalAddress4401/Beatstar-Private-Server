import prisma from '$lib/prisma';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isAuthenticated } from '$lib/wrapper/isAuthenticated';
import { zfd } from 'zod-form-data';
import zlib from 'zlib';
import crypto from 'crypto';

const schema = zfd.formData({
	name: zfd.text(),
	data: zfd.text()
});

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;

	const cms = await prisma.cms.findFirst({
		select: {
			data: true
		},
		where: {
			name: slug
		}
	});

	if (!cms) {
		error(400, 'Not found');
	}

	return {
		cms
	};
};

export const actions = {
	save: isAuthenticated(async ({ request }) => {
		const formData = await request.formData();
		const response = await schema.safeParseAsync(formData);
		if (response.error) {
			return fail(400);
		}

		const { name, data } = response.data;

		// is the JSON valid?
		try {
			JSON.parse(data);
		} catch (e) {
			return fail(400, { message: 'JSON not valid.' });
		}

		// is this a valid CMS?
		const proto = 

		const json = JSON.stringify(JSON.parse(data));

		console.log(json);

		console.log(crypto.createHash('md5').update(Buffer.from(json)).digest('hex'));

		/*await prisma.cms.update({
			data: {
				data: json,
				gzip: zlib.gzipSync(json),
				hash: crypto.createHash('md5').update(json).digest('hex')
			},
			where: {
				name
			}
		});*/
	})
};
