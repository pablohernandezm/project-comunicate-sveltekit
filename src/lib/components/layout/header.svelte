<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/components/atoms/logo.svelte';
	import Notification from '$lib/components/atoms/notification.svelte';
	import ProfilePicture from '$lib/components/atoms/profilePicture.svelte';

	export let loggedIn = false;
	export let userId: string;
	export let userName: string;
	export let email: string;
	export let avatarUrl: string;

	type Link = {
		url: string;
		text: string;
		img: string;
	};

	let menuOptions: Link[] = [];

	if (loggedIn) {
		menuOptions.push({
			url: '/app/profile/' + userId,
			text: 'Perfil',
			img: '/assets/profile.svg'
		});
	} else {
		menuOptions.push({ url: '/access', text: 'Acceder', img: '/assets/login.svg' });
	}

	let menuOpen = false;
	let menu: HTMLDivElement;

	const toggleMenu = () => {
		menuOpen = !menuOpen;
	};

	onMount(() => {
		document.addEventListener(
			'click',
			(e) => {
				if (menuOpen) {
					menuOpen = false;
					e.stopPropagation();
				}
			},
			{ capture: true }
		);
	});
</script>

<header>
	<div class="hero">
		<a href="/" aria-label="Inicio"> <Icon style="filled" color="gradient" /></a>
	</div>

	<div class="actions">
		<Notification color="gradient" style="default" />
		<ProfilePicture on:click={toggleMenu} src={avatarUrl} />
	</div>

	<div class="menu {menuOpen ? '' : 'menuHidden'}" bind:this={menu}>
		{#if loggedIn}
			<div class="menu-info">
				<img class="avatar" src={avatarUrl} alt="Avatar" />
				<ul class="menu-info-data">
					<li class="user-name">{userName}</li>
					<li class="user-email"><small>{email}</small></li>
				</ul>
			</div>
		{/if}

		<ul class="menu-options">
			{#each menuOptions as option}
				<li class="menu-option">
					<img src={option.img} alt={option.text} />
					<a href={option.url}>{option.text}</a>
				</li>
			{/each}

			{#if loggedIn}
				<li class="menu-option">
					<img src="/assets/logout.svg" alt="" />
					<form method="post" action="/access/logout">
						<button type="submit">Cerrar sesión</button>
					</form>
				</li>
			{/if}
		</ul>
	</div>
</header>

<style>
	header,
	.actions,
	.hero {
		display: flex;
		flex-direction: row;
	}

	header {
		justify-content: space-between;
		height: 5rem;
		padding-block: 1rem;
		padding-inline: 2rem;
		align-items: center;
		position: relative;
		background-color: var(--surfice-color);
		box-shadow: 0 2px 5px 1px hsla(0, 0%, 0%, 10%);
		z-index: 1000;
	}

	.hero {
		height: 100%;
	}

	.actions {
		gap: 1ch;
		height: 2rem;
	}

	.menu {
		background-color: white;
		border: 1px solid gray;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-block: 1rem;
		position: absolute;
		right: 0;
		top: 100%;
	}

	.menuHidden {
		display: none;
	}

	.menu > * {
		padding-inline: 1.5rem;
	}

	a,
	button {
		color: var(--text-title-color);
		background: none;
		border: none;
		padding: 0;
	}

	.menu-info {
		display: flex;
		gap: 2ch;
		flex-direction: row;
		height: 2.5rem;
	}

	.menu-options {
		display: flex;
		flex-direction: column;
		padding-block: 0.5rem;
		gap: 5px;
	}

	img {
		height: 1rem;
		aspect-ratio: 1/1;
	}

	.menu-option {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1ch;
		overflow: hidden;
	}

	.avatar {
		height: 100%;
		aspect-ratio: 1/1;
		object-fit: cover;
		border-radius: 100%;
	}
</style>
