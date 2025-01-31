import { SupabaseClient } from '$lib/server/utils/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  if (!platform) return { success: false };

  const supa = new SupabaseClient(platform);
  const { data, error } = await supa.publicGetHomepageExternalIds();

  if (data) {
    return { success: true, list: data };
  }

  return { success: false };
};
