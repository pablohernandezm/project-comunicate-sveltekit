import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET = async ({ url, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (session) {
        supabase.auth.signOut();
    }

    throw redirect(303, "/access");
};