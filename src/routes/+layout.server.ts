import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals: { getSession, supabase } }) => {
    return {
        session: getSession(),
    }
};