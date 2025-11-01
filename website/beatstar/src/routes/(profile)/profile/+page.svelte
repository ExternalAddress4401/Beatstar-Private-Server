<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import FilePicker from '$lib/components/FilePicker.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let { data, form } = $props();
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
	<div>
		<h1>Profile</h1>
		<hr />
	</div>

	<div class="block">
		<h2>Username</h2>
		<form method="POST" action="?/changeUsername" use:enhance>
			<TextInput name="username" value={user?.username} placeholder="Username" />
			<Button type="submit" text="Update username" />
		</form>
	</div>

	<hr />

	<div class="block">
		<h2>Restore</h2>
		<p>Restore your official server scores from your profile file.</p>
		<form method="POST" action="?/upload" use:enhance enctype="multipart/form-data">
			<FilePicker text="Upload Scores" />
		</form>
	</div>

	<hr />

	<div class="block">
		<h2>Import</h2>
		<p>Import your old Beatclone scores.</p>
		<p>
			Opening the game will create a file called uuid.txt in your beatstar folder. Upload that file
			here.
		</p>
		<form method="POST" action="?/import" use:enhance enctype="multipart/form-data" nae="import">
			<FilePicker
				text="Import Scores"
				name="uuid"
				onchange={(e) => e.currentTarget.form.submit()}
			/>
		</form>
		{#if form !== null && form.id === 'import'}
			<p>Imported {form.scoresAdded} scores.</p>
			<p>Updated {form.scoresUpdated} scores.</p>
		{/if}
	</div>

	<div class="block">
		<h2>Download</h2>
		<p>Place this file in your beatstar directory.</p>
		<div>
			<Button type="button" text="Download" onclick={downloadFile} />
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
		padding: 1rem;
	}
	.block {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
