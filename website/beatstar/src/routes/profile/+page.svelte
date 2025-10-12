<script lang="ts">
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
	</div>
</div>
