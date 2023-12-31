import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select(`full_name, biography, avatar_url`)
        .eq('id', session.user.id)
        .single()

    return { session, profile }
}