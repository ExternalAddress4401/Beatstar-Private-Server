<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props {
		name: string;
		type?: HTMLInputAttributes['type'];
		placeholder: string;
		value?: string;
	}

	let { name, type = 'text', placeholder, value }: Props = $props();
</script>

<input {type} class="input" {placeholder} {name} {value} />

<style>
	.input {
		all: unset;
		border-bottom: 1px solid white;
		text-align: left;
	}
</style>
