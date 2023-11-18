<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import Add from '$lib/components/atoms/add.svelte';
	import Close from '$lib/components/atoms/close.svelte';
	import ComunityCard from '$lib/components/molecules/comunity_card.svelte';
	import Link from '$lib/components/atoms/link.svelte';
	import MediaIcon from '$lib/components/atoms/media.svelte';
	import type { Database } from '$lib/database.types';
	import type { PageData } from './$types';
	import type { SubmitFunction } from './$types.js';

	export let data: PageData;
	let supabase = data.supabase;

	let dialog: HTMLDialogElement;
	let files: FileList;
	let comunities: Database['public']['Tables']['comunities']['Row'][] | null;

	const getComunities = async () => {
		const { data } = await supabase.from('comunities').select('*');
		comunities = data;
	};

	const getAditionalData = async (comunityID: string) => {
		const { data: ownerID, error: ownerError } = await supabase
			.from('user_comunity_rel')
			.select('user_id')
			.eq('comunity_id', comunityID)
			.eq('status', 'administrator')
			.single();
		if (!ownerError && ownerID && ownerID?.user_id) {
			const { data: avatarURL, error: avatarError } = await supabase
				.from('profiles')
				.select('avatar_url')
				.eq('id', ownerID.user_id)
				.single();

			if (avatarError || !avatarURL || !avatarURL.avatar_url) {
				return null;
			}

			const { data: ownerURL } = supabase.storage
				.from('avatars')
				.getPublicUrl(avatarURL.avatar_url);

			if (!ownerURL) {
				return null;
			}

			const { count: members, error: counterError } = await supabase
				.from('user_comunity_rel')
				.select('*', { count: 'exact' })
				.eq('comunity_id', comunityID)
				.single();
			if (counterError || !members) {
				return null;
			}

			return {
				ownerURL: ownerURL.publicUrl,
				members: members
			};
		} else {
			return null;
		}
	};

	onMount(() => {
		getComunities();
	});

	const beforeSubmision: SubmitFunction = async ({ formData, cancel }) => {
		if (files) {
			let extension = files[0].name.split('.').pop();
			let filePath = `${crypto.randomUUID()}.${extension}`;

			const { error } = await supabase.storage.from('banners').upload(filePath, files[0]);

			if (error) {
				cancel();
			} else {
				formData.set('bannerUrl', filePath);
			}
		}

		return async ({ result, update }) => {
			console.log(result.type);
			switch (result.type) {
				case 'failure':
					if (result.data?.filePath) {
						const { error } = await supabase.storage
							.from('banners')
							.remove([result.data?.filePath]);
						if (error) {
							console.error(error);
						}
					}
					break;
				default:
					break;
			}

			await update({ reset: false, invalidateAll: true });
		};
	};

	const toggleDialog = () => {
		if (dialog.open) {
			dialog.close();
		} else {
			dialog.showModal();
		}
	};
</script>

<main>
	<div class="floating-menu">
		<button type="button" aria-label="Unirse con un enlace" title="Unirse con un enlace">
			<Link size={50} />
		</button>

		<button
			type="button"
			aria-label="Crear una comunidad"
			title="Crear una comunidad"
			on:click={toggleDialog}
		>
			<Add size={50} style="filled" />
		</button>
	</div>

	<dialog class="form-container" bind:this={dialog}>
		<Close action={toggleDialog} />

		<h2 class="title color-brand">Nueva comunidad</h2>
		<form method="post" use:enhance={beforeSubmision} action="?/create">
			<div class="form-field">
				<label for="name">Nombre de la comunidad</label>
				<input type="text" name="name" id="name" />
			</div>

			<div class="form-field">
				<label for="banner" class="file-selector">
					Banner
					<div class="filezone">
						<input type="file" id="banner" accept="image/png, image/jpeg" bind:files required />

						<span class="file-selection">
							<MediaIcon />
							<span class="file-selection-text">
								{#if files}
									{files[0]?.name}
								{:else}
									sube una imagen
								{/if}
							</span>
						</span>
					</div>
				</label>
			</div>

			<div class="form-field">
				<label for="description">Descripción</label>
				<textarea name="description" id="description" rows="4" maxlength="132" />
			</div>

			<button type="submit">Crear</button>
		</form>
	</dialog>

	<div class="page-session">
		<h2 class="title">Tus comunidades</h2>
		{#if comunities}
			<div class="comunities">
				{#each comunities as comunity}
					{#await getAditionalData(comunity.id)}
						<div>loading...</div>
					{:then aditionalData}
						<ComunityCard
							id={comunity.id}
							name={comunity.name}
							bannerURL={supabase.storage.from('banners').getPublicUrl(comunity.banner).data
								.publicUrl}
							ownerAvatar={aditionalData ? aditionalData.ownerURL : '/assets/default-user.svg'}
							members={aditionalData ? aditionalData.members : 0}
						/>
					{/await}
				{/each}
			</div>
		{/if}
	</div>
	<div class="page-session">
		<h2 class="title">Pendientes por aceptar</h2>
	</div>
</main>

<style>
	main,
	form,
	form > div,
	.file-selector {
		display: flex;
		flex-direction: column;
	}

	main {
		gap: 1rem;
		padding: 1rem;
	}

	.floating-menu {
		position: fixed;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		right: 2rem;
		bottom: 2rem;
	}

	form,
	form > div {
		gap: 1.2rem;
	}

	input,
	.file-selection,
	textarea {
		padding: 0.5rem;
		border: solid 1px #383838;
	}

	input,
	.file-selection,
	button,
	.filezone,
	textarea {
		width: 100%;
		border-radius: 10px;
	}

	form > div,
	.file-selector {
		gap: 0.6rem;
	}

	input[type='file'] {
		opacity: 0;
		position: absolute;
		height: 100%;
		width: 100%;
	}

	.filezone {
		position: relative;
	}

	.file-selection {
		display: flex;
		align-items: center;
	}

	input:is(:focus) ~ .file-selection,
	input:is(:focus),
	textarea:is(:focus) {
		border: 1px solid var(--brand-color);
		outline: 1px solid var(--brand-color);
	}

	.comunities {
		display: grid;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
</style>
