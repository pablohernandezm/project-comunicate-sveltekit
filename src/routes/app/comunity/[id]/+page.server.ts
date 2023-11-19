import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
        throw redirect(303, '/access');
    }

    const { data: comunityInfo, error } = await supabase.from('comunities').select(`*`).eq('id', params.id).single();
    if (error) throw error;

    const bannerURL = supabase.storage.from('banners').getPublicUrl(comunityInfo.banner).data.publicUrl;

    const { data: status, error: statusError } = await supabase.from('user_comunity_rel').select(`status`).eq('user_id', session.user.id).eq('comunity_id', params.id).limit(1).single();

    if (statusError) throw statusError;

    if (!status) {
        throw redirect(303, `/app`);
    }



    return {
        comunityInfo,
        bannerURL,
        status: status.status
    };
};