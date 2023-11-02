import { error, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals }) => {

    if (await locals.getSession()) {
        const { error: err } = await locals.supabase.auth.signOut();
        if (err) {
            throw error(500, { message: 'Ha ocurrido un error inesperado al intentar cerrar sesión.' })
        }

        return new Response(null, { status: 303, headers: { Location: '/access' } })
    }

    return new Response(null, { status: 405, headers: { Location: '/access' }, statusText: 'Método no permitido. Debes iniciar sesión primero.' })

}