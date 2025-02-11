import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
  type CachedArticle,
  type GetCachedArticleResponse
} from '$lib/api/kv/article';
import { SupabaseClient } from '$lib/server/utils/supabase';

export const load: PageServerLoad = async ({ platform, params }) => {
  if (!platform) error(404);

  const cached_article = await platform.env.ARTICLES.get<CachedArticle>(
    `article:${params.article_external_id}`,
    'json'
  );

  if (!cached_article) {
    const supa = new SupabaseClient(platform);
    const { data } = await supa.adminGetArticleByExternalId(
      params.article_external_id
    );

    if (data && data[0]) {
      return {
        cached_article: {
          article: {
            external_id: data[0].external_id,
            published_at: data[0].published_at,
            published: data[0].published,
            category_id: data[0].category_id,
            voting_enabled: data[0].voting_enabled,

            content: data[0].content
          },
          votes: {
            support: 0,
            oppose: 0,
            shares: 0
          }
        }
      } as { cached_article: CachedArticle };
    } else {
      error(404);
    }
  }

  return {
    cached_article
  };
};
