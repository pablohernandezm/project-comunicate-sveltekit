import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    update: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const fullName = formData.get('fullname') as string
        const biography = formData.get('biography') as string
        const avatarUrl = formData.get('avatarUrl') as string

        const session = await getSession()

        if (!session) {
            throw redirect(303, '/access');
        }

        interface Changes {
            biography: string,
            full_name: string,
            id: string,
            updated_at: string,
            avatar_url?: string,
        }

        const changes: Changes = {
            biography: biography,
            full_name: fullName,
            id: session.user.id,
            updated_at: new Date().toISOString(),
        }

        if (avatarUrl) {
            changes.avatar_url = avatarUrl
        }

        const { error } = await supabase.from('profiles').upsert(changes)

        if (error) {
            return fail(500, {
                success: false,
                message: error.message,
            })
        }

        return {
            fullName,
            biography,
            avatarUrl,
            success: true,
            message: 'Perfil actualizado con éxito.',
        }
    }
};