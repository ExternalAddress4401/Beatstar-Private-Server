<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Form from '$lib/components/Form.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let { form } = $props();
</script>

<div class="center">
	<Form title="Login">
		<form class="form" method="POST" action="?/login" use:enhance>
			<TextInput placeholder="Username" name="username" />
			<TextInput type="password" placeholder="Password" name="password" />
			<div>
				<Button type="submit" text="Submit" />
			</div>
		</form>
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
	</Form>
</div>

<style>
	.form {
		display: flex;
		flex-direction: column;
		margin: 1rem;
		gap: 2rem;
	}

	.error {
		color: var(--error);
	}
</style>
