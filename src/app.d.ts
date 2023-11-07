import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from '$lib/database.types'
import type { ProfileData } from '$lib'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: Session | null
			profile: {
				avatar_url: string | null;
				biography: string | null;
				full_name: string;
			} | null
		}
		// interface Error {}
		// interface Platform {}
	}
}

export { };
