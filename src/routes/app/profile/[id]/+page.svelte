<script lang="ts">
	import { enhance } from '$app/forms';
	import MediaIcon from '$lib/components/utils/media.svelte';
	import type { SubmitFunction } from './$types.js';

	export let data;
	export let form;

	let files: FileList;
	let uploading: boolean;
	let avatarError: Error | null;

	let supabase = data.supabase;

	let fullname = data.profile?.full_name;
	let biography = data.profile?.biography;

	const beforeSubmision: SubmitFunction = async ({ formData, cancel }) => {
		if (files) {
			let extension = files[0].name.split('.').pop();
			let filePath = `${crypto.randomUUID()}.${extension}`;

			const { error } = await supabase.storage.from('avatars').upload(filePath, files[0]);

			if (error) {
				console.error(error, filePath);
				cancel();
			} else {
				formData.set('avatarUrl', filePath);
			}
		}

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					alert('Update realizado con éxito');
					break;
				case 'failure':
					alert('Un error ha ocurrido al actualizar los resultados.');
					break;
				default:
					break;
			}

			await update({ reset: false, invalidateAll: true });
		};
	};

	const newMessage = (node: HTMLElement) => {
		node.focus();
	};

	$: avatarUrl = data.profile?.avatar_url
		? supabase.storage.from('avatars').getPublicUrl(data.profile?.avatar_url).data.publicUrl
		: undefined;
</script>

<main>
	<div class="container">
		<div class="profile-data">
			<div class="avatar">
				<img src={avatarUrl ?? '/assets/default-user.svg'} alt="Avatar de usuario" />
			</div>

			<h1 class="fullname">{fullname}</h1>
			{#if biography}
				<div class="bibliography">
					{biography ?? ''}
				</div>
			{/if}
		</div>

		<div class="form-container">
			<h2>Editar perfil</h2>
			<form method="post" use:enhance={beforeSubmision} action="?/update">
				<div class="form-field">
					<label for="fullname">Nombre completo</label>
					<input type="text" name="fullname" id="fullname" bind:value={fullname} minlength="3" />
				</div>

				<div class="form-field">
					<label for="avatar" class="file-selector">
						Nuevo avatar
						<div class="filezone">
							<input
								type="file"
								id="avatar"
								accept="image/png, image/jpeg"
								bind:files
								disabled={uploading}
							/>

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
					<label for="biography">Presentación</label>
					<textarea
						name="biography"
						id="biography"
						rows="4"
						maxlength="132"
						bind:value={biography}
					/>
				</div>

				{#if form?.success}
					<p class="message" use:newMessage>{form.message}</p>
				{:else if form?.success == false}
					<p class="error" use:newMessage>{form?.message}</p>
				{:else if avatarError}
					<p class="error" use:newMessage>{avatarError.message}</p>
				{/if}

				<button type="submit">Guardar cambios</button>
			</form>
		</div>
	</div>
</main>

<style>
	main,
	.container,
	.profile-data,
	.form-container,
	form,
	form > div,
	.file-selector {
		display: flex;
		flex-direction: column;
	}

	main {
		place-items: center;
		padding: 1rem;
	}

	.container {
		gap: 2rem;
	}

	.fullname,
	.bibliography {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-word;
	}

	.fullname {
		-webkit-line-clamp: 2;
		text-align: center;
		font-size: 1.5rem;
		font-weight: 400;
	}

	.container,
	.bibliography {
		width: min(350px, 100%);
	}

	input,
	textarea,
	.file-selection {
		padding: 0.5rem;
		border: solid 1px #383838;
	}

	input,
	textarea,
	.file-selection,
	button,
	.filezone {
		width: 100%;
		border-radius: 10px;
	}

	.profile-data {
		align-items: center;
	}

	.avatar {
		aspect-ratio: 1/1;
		height: 100px;
		overflow: hidden;
		border-radius: 100%;
	}

	img {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}

	form,
	form > div {
		gap: 1.2rem;
	}

	form > div,
	.file-selector {
		gap: 0.6rem;
	}

	textarea {
		resize: none;
	}

	.bibliography {
		max-height: 80px;
		-webkit-line-clamp: 4;
		text-align: center;
		text-wrap: balance;
	}

	.form-container {
		padding: 1rem;
		border: dashed 1px gray;
		border-radius: 10px;
		gap: 2rem;
	}

	h2 {
		color: var(--brand-color);
		text-transform: uppercase;
		font-size: 1.4rem;
		text-align: center;
		margin: 0;
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
</style>
