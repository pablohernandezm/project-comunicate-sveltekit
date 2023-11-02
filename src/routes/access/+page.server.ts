// src/routes/login/+page.server.ts
import { AuthError } from '@supabase/supabase-js'
import { fail, type Actions, redirect, error } from '@sveltejs/kit'

export const actions: Actions = {
    register: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${url.origin}/access/auth/callback`,
            },
        })

        if (error) {
            if (error.status === 400) {
                return fail(400, { message: 'Correo o contraseña inválidos', success: false, email })
            }
            return fail(500, { message: 'Error del servidor. Inténtalo de nuevo más tarde.', success: false, email })
        }

        return {
            message: 'Por favor, revisa tu correo para confirmar tu cuenta.',
            success: true,
        }
    },

    login: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { error: err } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (err) {
            if (err instanceof AuthError && err.status === 400) {
                return fail(400, { message: 'Credenciales incorrectas. Revisa tus datos e intenta de nuevo.', success: false })
            }

            return fail(500, { message: 'Error del servidor. Inténtalo de nuevo más tarde.', success: false })
        }

        throw redirect(303, "/")
    },

    logout: async ({ locals: { supabase } }) => {
        const { error: err } = await supabase.auth.signOut();
        if (err) {
            throw error(500, { message: 'Ha ocurrido un error inesperado al intentar cerrar sesión.' })
        }
    }
}