import prisma from './prisma';

let cachedFlags: string[] = [];
let lastTimestamp: number | null = null;

export async function getFlags() {
	const now = Date.now();
	if (
		!cachedFlags ||
		!lastTimestamp ||
		now - lastTimestamp > parseInt(process.env.FLAG_FETCH_INTERVAL ?? '60000')
	) {
		cachedFlags = (await prisma.featureFlag.findMany())
			.filter((flag) => flag.enabled)
			.map((flag) => flag.name);
		lastTimestamp = now;
	}
	return cachedFlags;
}
