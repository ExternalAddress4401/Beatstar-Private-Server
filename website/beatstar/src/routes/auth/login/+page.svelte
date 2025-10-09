<script>
	import { enhance } from '$app/forms';
</script>

<div class="center">
	<div class="col">
		<h1>Login</h1>

		<form class="col" method="POST" action="?/login" use:enhance>
			<input type="text" name="username" placeholder="username" />
			<input type="password" name="password" placeholder="password" />
			<button type="submit">Submit</button>
		</form>
	</div>
</div>

<style>
	.center {
		height: 100%;
		display: grid;
		place-items: center;
	}
	.col {
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 0.25rem;
	}
</style>
