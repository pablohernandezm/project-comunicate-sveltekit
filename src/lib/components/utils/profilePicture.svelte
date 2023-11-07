<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let src: string = '/assets/default-user.svg';
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
		aspect-ratio: 1/1;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		aspect-ratio: 1/1;
		border-radius: 100%;
		height: 100%;
		object-fit: cover;
		width: 100%;
	}
</style>
