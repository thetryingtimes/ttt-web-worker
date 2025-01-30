import type { ArticleDraft } from '$lib/api/articles/article';
import { SupabaseClient } from '$lib/server/utils/supabase';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ platform, url }) => {
  const external_id = url.searchParams.get('external_id');

  if (platform && external_id) {
    const supa = new SupabaseClient(platform);
    const { data } = await supa.adminGetArticleByExternalId(external_id);

    if (data && data[0]) {
      return {
        success: true,
        article: data[0] as ArticleDraft
      };
    } else {
      return {
        success: false
      };
    }
  }

  return {
    success: true
  };
};
