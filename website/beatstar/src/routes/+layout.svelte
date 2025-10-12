<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Navigation from '$lib/components/Navigation.svelte';
	import '../app.css';
	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container">
	<Navigation user={data.user} />
	<div class="center">
		{@render children?.()}
	</div>
</div>

<style>
	.container {
		display: flex;
		height: 100%;
	}
</style>
