<script lang="ts">
	import Logo from '$lib/components/atoms/logo.svelte';
	import { enhance } from '$app/forms';
	export let form;

	let loggingIn = true;
	$: action = loggingIn ? '?/login' : '?/register';

	const changeForm = () => {
		loggingIn = !loggingIn;
	};
</script>

<main>
	<div class="container">
		<div class="logoContainer">
			<Logo color="gradient" />
		</div>

		<h1>Bienvenido</h1>

		{#if loggingIn}
			<p>Ingresa a Comunicate para continuar.</p>
		{:else}
			<p>Regístrate en comunicate para continuar.</p>
		{/if}

		<form method="post" {action} use:enhance>
			{#if !loggingIn}
				<input
					type="text"
					name="fullname"
					id="fullname"
					value={form?.fullname ?? ''}
					placeholder="Nombre completo"
					data-content="Nombre completo"
					required
					minlength="3"
				/>
			{/if}
			<input
				name="email"
				value={form?.email ?? ''}
				placeholder="Correo electrónico"
				data-content="Correo electrónico"
				required
			/>
			<input
				type="password"
				name="password"
				placeholder="Contraseña"
				data-content="Contraseña"
				required
			/>
			<button type="submit">Continuar</button>
		</form>

		{#if loggingIn}
			<p class="alternative">
				¿No estás registrado? <button on:click={changeForm}>Regístrate</button>
			</p>
		{:else}
			<p class="alternative">
				¿Ya tienes una cuenta? <button on:click={changeForm}>Inicia sesión</button>
			</p>
		{/if}

		{#if form?.success}
			<p class="message">{form.message}</p>
		{:else if form?.success == false}
			<p class="error">{form?.message}</p>
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		width: 100%;
		place-items: center;
		flex-direction: column;
		padding-inline: 40px;
		padding-block: 2rem;
	}

	.container {
		width: min(350px, 100%);
		text-align: center;
		background-color: white;
		padding: 1rem 2rem;
		border-radius: 10px;
		aspect-ratio: 9/13;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.logoContainer {
		height: 125px;
	}

	.container > *:not(.logoContainer) {
		width: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	input,
	button {
		padding: 0.5rem 1rem;
		width: 100%;
	}
</style>
