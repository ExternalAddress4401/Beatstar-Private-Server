<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	const user = data.user;

	const downloadFile = () => {
		if (!user) {
			return;
		}

		const blob = new Blob([user?.uuid], { type: 'text/plain' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'user';

		document.body.append(a);
		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(a.href);
	};
</script>

<div class="center">
	<div class="col">
		<h1>Profile</h1>

		<input type="text" value={user?.username} />
		<button onclick={downloadFile}>Download</button>
		<form method="POST" action="?/upload" use:enhance enctype="multipart/form-data">
			<input name="profile" type="file" />
			<button type="submit">Upload scores</button>
		</form>
	</div>
</div>
