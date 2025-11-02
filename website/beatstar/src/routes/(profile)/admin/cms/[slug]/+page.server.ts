import prisma from '$lib/prisma';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zfd } from 'zod-form-data';
import zlib from 'zlib';
import crypto from 'crypto';
import { CMSMap } from '@externaladdress4401/protobuf/tools/CMSMap';
import { ProtobufHandler } from '@externaladdress4401/protobuf/ProtobufHandler';
import { isAdmin } from '$lib/wrapper/isAdmin';

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
	save: isAdmin(async ({ request }) => {
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
		const proto = CMSMap[name];
		if (!proto) {
			return fail(400, { message: 'Invalid name.' });
		}

		const json = JSON.parse(data);

		const built = await new ProtobufHandler('WRITE').writeProto(json, proto);

		await prisma.cms.update({
			data: {
				data: json,
				gzip: zlib.gzipSync(built),
				hash: crypto.createHash('md5').update(built).digest('hex')
			},
			where: {
				name
			}
		});
	})
};
