<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	export let src: string = PUBLIC_BASE_URL + '/assets/default-user.svg';
	export let alt: string = 'Este usuario no tiene foto de perfil.';

	const dispatch = createEventDispatcher();

	const onClick = () => {
		dispatch('click');
	};

	export let rounded = true;

	if (rounded) {
	}
</script>

<button on:click|preventDefault={onClick} style="border-radius: {rounded ? 100 : 0}%;">
	<img {src} {alt} />
</button>

<style>
	button {
		height: 100%;
		aspect-ratio: 1/1;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		height: 100%;
		aspect-ratio: 1/1;
		object-fit: cover;
	}
</style>
