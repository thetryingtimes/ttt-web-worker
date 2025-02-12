import { SupabaseClient } from '$lib/server/utils/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, url }) => {
  if (!platform) return { success: false };

  const offsetParam = url.searchParams.get('offset');
  const supa = new SupabaseClient(platform);
  const { data } = await supa.publicGetHomepageExternalIds(
    offsetParam ? Number(offsetParam) : 0
  );

  if (data) {
    return {
      success: true,
      list: data,
      nextOffset:
        data.length === 10
          ? offsetParam
            ? Number(offsetParam) + 10
            : 10
          : undefined
    };
  }

  return { success: false };
};
