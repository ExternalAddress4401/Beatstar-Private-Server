<script lang="ts">
	interface Props {
		title: string;
		action?: any;
		children?: any;
	}

	let { title, action, children }: Props = $props();
</script>

<div class="card">
	<h2>{title}</h2>
	<content class="content">
		{@render children?.()}
	</content>
	{#if action}
		<footer>
			{@render action?.()}
		</footer>
	{/if}
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 16rem;
		height: 16rem;
		background-color: var(--primary);
		border-radius: 3rem;
		padding: 0.5rem;

		h2 {
			width: 100%;
			text-align: center;
			border-bottom: 3px solid black;
		}
	}
	.content {
		flex: 1;
	}
</style>
