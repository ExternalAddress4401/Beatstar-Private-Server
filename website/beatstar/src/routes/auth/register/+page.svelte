<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div class="center">
	<div class="col">
		<h1>Create Account</h1>

		<form class="col" method="POST" action="?/register" use:enhance>
			<input type="text" name="username" placeholder="Username" />
			<input type="password" name="password" placeholder="Password" />
			<input type="password" name="verifyPassword" placeholder="Verify password" />
			<button>Submit</button>
		</form>
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
		{#if form?.success}
			<p>Account created successfully.</p>
		{/if}
	</div>
</div>

<style>
	.center {
		height: 100%;
		display: grid;
		place-items: center;
	}
	.col {
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 0.25rem;
	}
	.error {
		color: var(--error);
	}
</style>
