<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	{#if data.session}
		Hi {data.session?.user.email}
	{:else}
		Por favor, inicia sesión.
	{/if}
</main>
