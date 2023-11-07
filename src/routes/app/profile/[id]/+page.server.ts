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

        const { error } = await supabase.from('profiles').upsert({
            avatar_url: avatarUrl,
            biography: biography,
            full_name: fullName,
            id: session.user.id,
            updated_at: new Date().toISOString(),
        })

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