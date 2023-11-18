import type { PageServerLoad } from "./$types";
import { redirect, type Actions, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
    let session = await getSession();
    if (!session) {
        throw redirect(303, "/");
    }

    const { data: user_comunities, error } = await supabase.from("user_comunity_rel").select("*").eq("user_id", session?.user?.id).range(0, 10);

    if (error && error?.code != 'PGRST116') {
        throw error;
    }


    return {
        user_comunities,
    };
};

export const actions: Actions = {
    create: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const bannerUrl = formData.get("bannerUrl") as string;
        const uuid = crypto.randomUUID();

        const { error } = await supabase.from("comunities").insert({ id: uuid, name: name, description: description, banner: bannerUrl }).single();

        if (error) {
            console.error(error);
            return fail(500, { message: 'Error del servidor. Inténtalo de nuevo más tarde.', success: false, filePath: bannerUrl })
        }

        else {
            throw redirect(303, `/app/comunity/${uuid}`)
        }
    }
};