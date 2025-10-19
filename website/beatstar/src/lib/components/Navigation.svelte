<script lang="ts">
	import Login from '$lib/icons/login.svelte';
	import Logout from '$lib/icons/logout.svelte';
	import Register from '$lib/icons/register.svelte';
	import User from '$lib/icons/user.svelte';
	interface Props {
		user: {
			username: string;
			uuid: string;
			admin: boolean;
		} | null;
	}
	let { user }: Props = $props();

	async function logout() {
		const res = await fetch('/api/logout', { method: 'POST' });
		if (res.redirected) {
			window.location.href = '/';
		}
	}
</script>

<div class="container">
	<h2>Beatstar</h2>
	{#if user === null}
		<div class="row">
			<Login size="32" color="#f4f3ee" />
			<a class="link" href="/auth/login">Login</a>
		</div>
		<div class="row">
			<Register size="32" color="#f4f3ee" />
			<a class="link" href="/auth/register">Register</a>
		</div>
	{/if}
	{#if user !== null}
		<div class="row">
			<User size="32" color="#f4f3ee" />
			<a class="link" href="/profile">Profile</a>
		</div>
		<div class="row" onclick={logout}>
			<Logout size="32" color="#f4f3ee" />
			<p>Logout</p>
		</div>
		{#if user.admin}
			<div class="row">
				<User size="32" color="#f4f3ee" />
				<a class="link" href="/admin">Admin</a>
			</div>
		{/if}
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background: var(--sidebar);
		padding: 0.25rem;
		width: 9rem;
	}
	.link {
		all: unset;
		cursor: pointer;
	}
	.row {
		display: flex;
		align-items: center;
		font-weight: 800;
		gap: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}
	h2 {
		text-align: center;
	}
</style>
