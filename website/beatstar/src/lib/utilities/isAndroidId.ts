export const isAndroidId = (potentialId: string) => {
	return /^[a-f0-9]{16}$/.test(potentialId);
};
