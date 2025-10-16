<script>
	import '../../app.css';

	let { children } = $props();
</script>

<div class="container">
	<div class="col1">
		<img src="/images/background.png" alt="background" />
	</div>
	{@render children?.()}
</div>

<style>
	.container {
		display: flex;
		height: 100%;
	}
	.col1 {
		width: 50%;
		height: 100%;

		img {
			height: 100%;
		}
	}
</style>
