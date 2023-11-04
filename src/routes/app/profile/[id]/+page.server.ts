import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    return {
        greeting: `Hello ${params.id ?? '[No user]'}!`
    }
};