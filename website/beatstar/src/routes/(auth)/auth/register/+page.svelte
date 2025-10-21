<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Form from '$lib/components/Form.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let { form } = $props();
</script>

<div class="center">
	<Form title="Create Account">
		<form class="form" method="POST" action="?/register" use:enhance>
			<TextInput name="username" placeholder="Username" />
			<TextInput type="password" name="password" placeholder="Password" />
			<TextInput type="password" name="verifyPassword" placeholder="Verify Password" />
			<Button type="submit" text="Submit" />
		</form>
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
		{#if form?.success}
			<p>Account created successfully.</p>
		{/if}
	</Form>
</div>

<style>
	.center {
		height: 100%;
		display: grid;
		place-items: center;
	}
	.error {
		color: var(--error);
		font-weight: 600;
	}
	.form {
		display: flex;
		flex-direction: column;
		margin: 1rem;
		gap: 2rem;
	}
</style>
