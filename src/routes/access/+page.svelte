<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<main>
	<form method="post" use:enhance>
		<input name="email" value={form?.email ?? ''} />
		<input type="password" name="password" />
		<button>Sign up</button>
	</form>
</main>

<style>
	main {
		width: 300px;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
