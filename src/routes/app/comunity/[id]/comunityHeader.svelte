<script lang="ts">
	import { page } from '$app/stores';

	export let bannerURL: string;
	export let comunityName: string;
	export let comunityDescription: string;
	export let canModify: boolean = false;
	//export let inviteHandler: () => void;

	let descriptionIsOpen = false;
</script>

<svlete:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svlete:head>

<header>
	<img src={bannerURL} alt="Banner de {comunityName}" />

	<div class="content">
		<h1>{comunityName}</h1>
		<div class="options">
			<button type="button" class="option">
				<span class="material-symbols-outlined rotate"> link </span>
				Invitar
			</button>

			{#if canModify}
				<a href="{$page.url}/config" class="option">
					<span class="material-symbols-outlined"> settings </span>
				</a>
			{/if}
		</div>
	</div>

	{#if descriptionIsOpen}
		<div class="description">
			{comunityDescription}
		</div>
	{/if}

	<button
		type="button"
		class="expand"
		on:click={() => {
			descriptionIsOpen = !descriptionIsOpen;
		}}
	>
		<span class="material-symbols-outlined expand-icon">
			{descriptionIsOpen ? 'expand_less' : 'expand_more'}
		</span>
	</button>
</header>

<style>
	header {
		display: grid;
		overflow: hidden;
		grid-template-rows: 200px 1fr;
		background-color: var(--surfice-color);
		box-shadow: 0 2px 5px 1px hsla(0, 0%, 0%, 10%);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50%;
	}

	h1 {
		margin: 0;
		color: var(--text-title-color);
	}

	.content,
	.description {
		padding: 1.5rem;
	}

	.content {
		display: flex;
		gap: 2ch;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.options {
		display: flex;
		gap: 1ch;
	}

	.option {
		padding: 1ch;
		background-color: hsla(198, 100%, 12%, 4%);
		border-radius: 10px;
		display: flex;
		align-items: center;
		gap: 1ch;
	}

	.rotate {
		transform: rotate(145deg);
	}

	.expand:is(:hover) {
		background-color: hsla(198, 100%, 12%, 10%);
	}

	.expand {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	.expand-icon {
		font-size: 2rem;
	}
</style>
