<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let { data } = $props();
	const user = data.user;

	const downloadFile = () => {
		if (!user) {
			return;
		}

		const blob = new Blob([user?.uuid], { type: 'application/octet-stream' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'user';

		document.body.append(a);
		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(a.href);
	};
</script>

<div class="container">
	<Card title="Profile">
		<form method="POST" action="?/changeUsername" use:enhance class="center">
			<TextInput name="username" value={user?.username} placeholder="Username" />
			<Button type="submit" text="Update username" />
		</form>
	</Card>
	<Card title="Restore">
		<form method="POST" action="?/upload" use:enhance enctype="multipart/form-data" class="center">
			<input name="profile" type="file" />
			<Button type="submit" text="Upload scores" />
		</form>
	</Card>
	<Card title="Download">
		<p>Place this downloaded file in /sdcard/beatstar</p>
		<Button type="button" text="Download" onclick={downloadFile} />
	</Card>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1rem;
	}
	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
</style>
