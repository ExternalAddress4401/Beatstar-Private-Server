<script lang="ts">
	import Button from './Button.svelte';

	let fileInput: HTMLInputElement;

	let { text, name, accept, onchange } = $props();

	const openFilePicker = () => {
		fileInput.click();
	};
</script>

<input type="file" bind:this={fileInput} class="filePicker" {accept} {onchange} {name} />
<Button {text} type="button" onclick={openFilePicker} />

<style>
	.filePicker {
		display: none;
	}
</style>
