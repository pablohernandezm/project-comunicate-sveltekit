<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import Header from '$lib/components/layout/header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let { supabase, profile } = data;
	$: ({ supabase, profile } = data);

	$: avatarUrl = profile?.avatar_url
		? supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl
		: '/assets/default-user.svg';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Header
	loggedIn={data.session ? true : false}
	userId={data.session?.user.id}
	{avatarUrl}
	userName={profile?.full_name ?? ''}
	email={data.session?.user.email ?? ''}
/>
<slot />
