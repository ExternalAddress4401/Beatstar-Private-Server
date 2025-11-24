<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import FilePicker from '$lib/components/FilePicker.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let { data, form } = $props();

	//const flags = data.flags;

	const user = $derived(data.user);

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

	const reset = async () => {
		if (confirm('All your progress will be deleted. You cannot get it back. Are you sure?')) {
			await fetch('/profile/reset', {
				method: 'POST',
				body: JSON.stringify({
					uuid: user?.uuid
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
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
		{#if form !== null && form.id === 'changeUsername'}
			{#if form.error}
				<p>{form.error}</p>
			{:else}
				<p>Username updated successfully.</p>
			{/if}
		{/if}
		<p>Star count: {user.starCount}</p>
		<form method="POST" action="?/updateStarCount" use:enhance>
			<Button type="submit" text="Update Star Count" />
		</form>
		{#if form !== null && form.id === 'updateStarCount'}
			<p>New star count: {form.newStarCount}</p>
		{/if}
		<form method="POST" action="?/unlockAllSongs" use:enhance>
			<div class="row">
				<input
					type="checkbox"
					name="unlockAll"
					bind:checked={user.unlockAllSongs}
					onchange={(e) => e.currentTarget.form?.requestSubmit()}
				/>
				<p>Unlock all songs</p>
			</div>
		</form>
	</div>

	<hr />

	<div class="block">
		<h2>Restore</h2>
		<p>Restore your official server scores from your profile file.</p>
		<form method="POST" action="?/restore" use:enhance enctype="multipart/form-data">
			<FilePicker
				text="Upload Scores"
				name="profile"
				accept="*"
				onchange={(e) => e.currentTarget.form.submit()}
			/>
		</form>
		{#if form !== null && form.id === 'restore'}
			{#if !form.error}
				<p>Imported {form.scoresAdded} scores.</p>
			{/if}
			<p>{form.error}</p>
		{/if}
	</div>

	<hr />

	{#if [].includes('allow_beatclone_import')}
		<div class="block">
			<h2>Import</h2>
			<p>Import your old Beatclone scores.</p>
			<p>
				Opening the game will create a file called uuid.txt in your beatstar folder. Upload that
				file here.
			</p>
			<form method="POST" action="?/import" use:enhance enctype="multipart/form-data" name="import">
				<FilePicker
					text="Import Scores"
					name="uuid"
					accept=".txt"
					onchange={(e) => e.currentTarget.form.submit()}
				/>
			</form>
			{#if form !== null && form.id === 'import'}
				<p>Imported {form.scoresAdded} scores.</p>
				<p>Updated {form.scoresUpdated} scores.</p>
			{/if}
		</div>
	{/if}

	<div class="block">
		<h2>Download</h2>
		<p>Place this file in your beatstar directory.</p>
		<div>
			<Button type="button" text="Download" onclick={downloadFile} />
		</div>
	</div>

	<hr />

	<div class="block">
		<h2>Reset</h2>
		<p>Resets all of your progress. This is non reversible.</p>
		<div>
			<Button type="button" text="Reset" onclick={reset} />
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
	.row {
		display: flex;
		gap: 0.5rem;
	}
</style>
