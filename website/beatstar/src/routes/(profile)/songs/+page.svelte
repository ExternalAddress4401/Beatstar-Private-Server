<script lang="ts">
	import { PUBLIC_SERVER_IP } from '$env/static/public';
	import SongCard from '$lib/components/SongCard.svelte';
	import { onMount } from 'svelte';
	import type { SongCardProps } from '../../../interfaces/SongCardProps';
	import TextInput from '$lib/components/TextInput.svelte';

	const songs: SongCardProps[] = [];
	let filteredSongs: SongCardProps[] = $state([]);

	onMount(async () => {
		const songRes = await fetch(PUBLIC_SERVER_IP + '/cms/SongConfig/raw');
		const langConfigRes = await fetch(PUBLIC_SERVER_IP + '/cms/LangConfig/raw');
		const assetsPatchRes = await fetch(PUBLIC_SERVER_IP + '/cms/AssetsPatchConfig/raw');

		const songConfig = JSON.parse(await songRes.text());
		const langConfig = JSON.parse(await langConfigRes.text());
		const assetsPatchConfig = JSON.parse(await assetsPatchRes.text());

		const baseUrl = `${assetsPatchConfig.downloadUrl}/${assetsPatchConfig.downloadBucketVersion}/Android`;

		for (const song of songConfig.Songs) {
			const title = langConfig.translations.find(
				(translation) => translation.id === song.SongTitleLocId
			).translations.value;
			const artist = langConfig.translations.find(
				(translation) => translation.id === song.SongArtistLocId
			).translations.value;

			const beatmapInfo = songConfig.BeatmapVariants.find((s) => s.Song_id === song.id);
			const chartId = beatmapInfo.InteractionsAsset_id;
			const audioId = song.audioAsset_id;
			const difficulty = beatmapInfo.Difficulty_id;

			const audio = assetsPatchConfig.assetBundles.find(
				(bundle: { id: string }) => bundle.id === audioId
			);
			const chart = assetsPatchConfig.assetBundles.find(
				(bundle: { id: string }) => bundle.id === chartId
			);

			// ignore calibration song
			if (!beatmapInfo.Description) {
				continue;
			}

			songs.push({
				title,
				artist,
				difficulty,
				isDeluxe: beatmapInfo.Description.toLowerCase().includes('pro'),
				audioUrl: `${baseUrl}/${audio.id}_${audio.HashAndroid}${audio.CRCAndroid}.bundle`,
				chartUrl: `${baseUrl}/${chart.id}_${chart.HashAndroid}${chart.CRCAndroid}.bundle`
			});
		}
		filteredSongs = songs;
	});

	const onFilterChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const value = target.value.trim().toLowerCase();
		if (value == '') {
			filteredSongs = songs;
		}
		filteredSongs = songs.filter((song) => song.title.toLowerCase().includes(value));
	};
</script>

<div class="container">
	<h1>Songs</h1>
	<TextInput placeholder="Filter" name="filter" onkeyup={onFilterChange} />
	{#each filteredSongs as song}
		<SongCard
			title={song.title}
			artist={song.artist}
			difficulty={song.difficulty}
			isDeluxe={song.isDeluxe}
			audioUrl={song.audioUrl}
			chartUrl={song.chartUrl}
		/>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 1rem;
		padding: 1rem;
		overflow-y: auto;
	}
</style>
