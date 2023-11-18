<script lang="ts">
	import Persons from '$lib/components/atoms/persons.svelte';
	export let bannerURL: string;
	export let name: string;
	export let id: string;
	export let ownerAvatar: string;
	export let members: number;
</script>

<a href="/app/comunity/{id}" class="link">
	<div class="container" style="background-image: url({bannerURL})">
		<header>
			<img src={ownerAvatar} alt="Administrador." class="admin" />
			<h2 class="title">{name}</h2>
		</header>

		<footer>
			<Persons size={16} />
			<small class="members_counter">{members} {members === 1 ? 'miembro' : 'miembros'}</small>
		</footer>
	</div>
</a>

<style>
	.admin {
		width: 36px;
		aspect-ratio: 1/1;
		border-radius: 100%;
	}
	.title {
		width: 100%;
		text-wrap: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.link {
		display: flex;
		flex-shrink: 0;
		flex-grow: 1;
	}

	footer {
		display: flex;
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		align-items: center;
		gap: 0.5ch;
	}

	header {
		display: flex;
		width: 100%;
		gap: 1ch;
	}

	.container,
	.title {
		color: white;
	}
	.container {
		background-blend-mode: overlay;
		background-color: hsla(198, 100%, 12%, 60%);
		background-position: 50%;
		background-size: cover;
		border-radius: 10px;
		height: 100%;
		padding: 2rem 1rem;
		position: relative;
		width: 100%;
		z-index: 0;
		display: flex;
		flex-direction: column;
	}
</style>
