import type { GetCachedArticleResponse } from '$lib/api/kv/article';
import { KVClient } from '$lib/server/utils/kv';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SupabaseClient } from '$lib/server/utils/supabase';

export const GET: RequestHandler = async ({ platform, params }) => {
  const failure: GetCachedArticleResponse = { success: false };

  if (!platform) return json(failure);

  const kv = new KVClient(platform);
  const cached_article = await kv.getArticleByExternalId(params.external_id);

  if (cached_article)
    return json({
      success: true,
      cached_article
    } as GetCachedArticleResponse);
  else {
    const supa = new SupabaseClient(platform);
    const { data } = await supa.adminGetArticleByExternalId(params.external_id);

    if (data && data[0]) {
      return json({
        success: true,
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
      } as GetCachedArticleResponse);
    }
  }

  return json(failure);
};
