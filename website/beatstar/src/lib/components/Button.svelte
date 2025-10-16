<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
	}
	let { text, onclick }: Props = $props();
</script>

<button class="button" {onclick}>{text}</button>

<style>
	.button {
		all: unset;
		background: var(--secondary);
		padding: 0.5rem 1.5rem;
		border-radius: 9999px;
		font-weight: 600;
		cursor: pointer;
		text-align: center;
	}
</style>
