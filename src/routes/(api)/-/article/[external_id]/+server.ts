import type { GetCachedArticleResponse } from '$lib/api/kv/article';
import { KVClient } from '$lib/server/utils/kv';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

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

  return json(failure);
};
