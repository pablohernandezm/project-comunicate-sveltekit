<script lang="ts">
	import Persons from '$lib/components/atoms/persons.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	export let id: string;
	export let supabase: SupabaseClient;

	let membersCount: number;
	let name: string;
	let banner: string;
	let description: string;

	async function getInfo() {
		const { data, error } = await supabase
			.from('comunities')
			.select(
				`
		name,
		banner,
		description,
		user_comunity_rel(count)`
			)
			.eq('id', id)
			.single();

		if (!error) {
			membersCount = data.user_comunity_rel[0].count ?? 0;
			banner = supabase.storage.from('banners').getPublicUrl(data.banner).data.publicUrl;
			name = data.name;
			description = data.description;
		}
	}

	onMount(async () => {
		await getInfo();
	});
</script>

<a href="/app/comunity/{id}" class="link">
	<div class="container" style="background-image: url({1})">
		<header>
			<img src={banner} alt="Administrador." class="admin" />
			<h2 class="title">{name}</h2>
		</header>

		<footer>
			<Persons size={16} />
			<small class="members_counter"
				>{membersCount} {membersCount === 1 ? 'miembro' : 'miembros'}</small
			>
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
