<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Form from '$lib/components/Form.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
</script>

<div class="center">
	<Form title="Login">
		<form class="form" method="POST" action="?/login" use:enhance>
			<TextInput placeholder="Username" name="username" />
			<TextInput placeholder="Password" name="password" />
			<div>
				<Button text="Submit" />
			</div>
		</form>
	</Form>
</div>

<style>
	.form {
		display: flex;
		flex-direction: column;
		margin: 1rem;
		gap: 2rem;
	}
</style>
