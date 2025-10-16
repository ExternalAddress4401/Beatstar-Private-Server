<script lang="ts">
	interface Props {
		title: string;
		children: any;
	}

	let { title, children }: Props = $props();
</script>

<div class="card">
	<h2>{title}</h2>
	{@render children?.()}
</div>

<style>
	.card {
		width: 16rem;
		height: 16rem;
		background-color: var(--primary);
		border-radius: 3rem;
		padding: 0.5rem;

		h2 {
			text-align: center;
			border-bottom: 3px solid black;
		}
	}
</style>
