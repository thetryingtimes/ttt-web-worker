import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { CachedArticle } from '$lib/api/kv/article';

export const POST: RequestHandler = async ({ platform, params }) => {
  if (!platform) return json({});

  const key = `article:${params.external_id}`;

  const cached_article = await platform.env.ARTICLES.get<CachedArticle>(
    key,
    'json'
  );

  if (cached_article) {
    cached_article.votes.shares = (cached_article.votes.shares || 0) + 1;

    await platform.env.ARTICLES.put(key, JSON.stringify(cached_article));
  }

  return json({});
};
