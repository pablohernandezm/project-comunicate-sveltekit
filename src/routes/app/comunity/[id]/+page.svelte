<script lang="ts">
	export let data;
	import ComunityHeader from './comunityHeader.svelte';

	const canModify = data.status === 'administrator' || data.status == 'moderator';
</script>

<ComunityHeader
	bannerURL={data.bannerURL}
	comunityName={data.comunityInfo.name}
	{canModify}
	comunityDescription={data.comunityInfo.description}
/>

<main />

<style>
	main {
		height: 100%;
	}
</style>
