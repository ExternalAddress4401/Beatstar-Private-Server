<script lang="ts">
	import type { SongCardProps } from '../../interfaces/SongCardProps';

	let { title, artist, difficulty, isDeluxe, audioUrl, chartUrl }: SongCardProps = $props();
</script>

<div class="container">
	<div class="col info">
		<div class="row">
			<p class="title">{title}</p>
			{#if difficulty == 1}
				<img class="extreme" src="/assets/images/extreme.png" alt="extrene" />
			{:else if difficulty === 3}
				<img class="hard" src="/assets/images/hard.png" alt="hard" />
			{/if}
			{#if isDeluxe}
				<p class="pro">PRO</p>
			{/if}
		</div>
		<p>{artist}</p>
	</div>
	<div class="links">
		<a class="link" href={audioUrl}>Audio</a>
		<a class="link" href={chartUrl}>Chart</a>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
	}
	.col {
		display: flex;
		flex-direction: column;
	}
	.row {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	.links {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.title {
		font-weight: 800;
	}
	.link {
		all: unset;
		text-decoration: underline;
		color: aqua;

		&:hover {
			cursor: pointer;
		}
	}
	.info {
		text-align: left;
	}
	.pro {
		color: red;
		position: relative;
		transform: rotate(30deg);
		left: -10px;
		top: -10px;
	}
	.hard {
		width: 0.7rem;
		height: 1rem;
	}
	.extreme {
		width: 0.9rem;
		height: 1rem;
	}
</style>
