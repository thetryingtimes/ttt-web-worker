import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { type CachedArticle } from '$lib/api/kv/article';

export const load: PageServerLoad = async ({ platform, params }) => {
  if (!platform) error(404);

  const cached_article = await platform.env.ARTICLES.get<CachedArticle>(
    `article:${params.article_external_id}`,
    'json'
  );

  if (!cached_article) error(404);

  return {
    cached_article
  };
};
