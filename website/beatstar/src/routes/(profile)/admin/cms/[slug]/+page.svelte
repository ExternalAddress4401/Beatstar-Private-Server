<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import type { PageProps } from './$types';

	let textArea: HTMLTextAreaElement;
	let parsedMessage = $state();

	const slug = page.params.slug;

	let { data }: PageProps = $props();

	const cms = JSON.stringify(data.cms.data, null, 2);

	const validate = () => {
		const v = textArea.value;
		try {
			JSON.parse(v);
			parsedMessage = 'Success!';
		} catch (e) {
			parsedMessage = 'Failed!';
		}
	};
</script>

<div class="full">
	<h1>{slug}</h1>
	<form method="POST" action="?/save" use:enhance>
		<textarea bind:this={textArea} class="full" rows={30} value={cms} name="data"></textarea>
		<Button type="button" text="Validate" onclick={validate} />
		<Button type="submit" text="Save" />
		{parsedMessage}
		<input type="text" hidden value={slug} name="name" />
	</form>
</div>

<style>
	.full {
		width: 100%;
	}
</style>
