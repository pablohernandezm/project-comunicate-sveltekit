<script lang="ts">
	import Add from '$lib/components/atoms/add.svelte';
	export let action: () => void;
</script>

<button type="button" on:click={action} aria-label="Cerrar modal">
	<Add size={30} rotationAngle={45} style="default" />
</button>

<style>
	button {
		display: block;
		width: min-content;
		aspect-ratio: 1/1;
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
	}
</style>
