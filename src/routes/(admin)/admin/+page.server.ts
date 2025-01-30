import type { ArticleDraft } from '$lib/api/articles/article';
import { SupabaseClient } from '$lib/server/utils/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  if (!platform) return { success: false };

  const supa = new SupabaseClient(platform);
  const { data, error } = await supa.adminListArticles();

  if (data) {
    return {
      success: true,
      articles: data as ArticleDraft[]
    };
  }

  if (error) {
    return {
      success: false
    };
  }
};
