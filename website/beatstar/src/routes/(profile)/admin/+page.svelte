<script lang="ts">
	import NavCard from '$lib/components/NavCard.svelte';

	let { data } = $props();

	const cms = data.cms;
</script>

<div class="container">
	{#each cms as { name }}
		<NavCard title={name} href={`/admin/cms/${name}`} />
	{/each}
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 1rem;
	}
</style>
