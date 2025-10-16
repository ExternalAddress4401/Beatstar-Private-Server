<script lang="ts">
	interface Props {
		title: string;
		children: any;
	}

	let { title, children }: Props = $props();
</script>

<div class="col formContainer">
	<h1>{title}</h1>

	{@render children()}
</div>

<style>
	.formContainer {
		width: 32rem;
		height: 32rem;
		background: rgb(43, 38, 78, 0.3);
		border-radius: 2rem;
		border: 1px solid rgb(38, 36, 48);
	}
</style>
