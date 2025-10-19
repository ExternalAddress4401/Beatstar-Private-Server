<script lang="ts">
	interface Props {
		title: string;
		href: string;
	}

	let { title, href }: Props = $props();
</script>

<div class="card">
	<a {href} class="link"><h3>{title}</h3></a>
</div>

<style>
	.card {
		background-color: var(--primary);
		border-radius: 3rem;
		padding: 0.5rem;
		text-align: center;

		&:hover {
			cursor: pointer;
		}
	}
	.link {
		all: unset;
	}
</style>
