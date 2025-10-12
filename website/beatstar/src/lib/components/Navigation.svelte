<script lang="ts">
	interface Props {
		user: {
			username: string;
			uuid: string;
		} | null;
	}
	let { user }: Props = $props();
</script>

<div class="container">
	<a class="link" href="/auth/login">Login</a>
	<a class="link" href="/auth/register">Register</a>
</div>

<style>
	.container {
		display: flex;
		gap: 1rem;
		background: var(--primary);
		padding: 0.25rem;
	}
	.link {
		all: unset;
		cursor: pointer;
	}
</style>
