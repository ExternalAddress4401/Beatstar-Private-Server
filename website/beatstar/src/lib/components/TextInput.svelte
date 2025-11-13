<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props {
		name: string;
		type?: HTMLInputAttributes['type'];
		placeholder: string;
		value?: string;
		onkeyup?: (e: Event) => void;
	}

	let { name, type = 'text', placeholder, value, onkeyup }: Props = $props();
</script>

<input {type} class="input" {placeholder} {name} {value} {onkeyup} />

<style>
	.input {
		all: unset;
		border-bottom: 1px solid white;
		text-align: left;
	}
</style>
