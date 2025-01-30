import {
  ArticleSaveRequestParser,
  type ArticleSaveResponse
} from '$lib/api/articles/article';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SupabaseClient } from '$lib/server/utils/supabase';

export const POST: RequestHandler = async ({ platform, request }) => {
  const failure: ArticleSaveResponse = { success: false };
  const success: ArticleSaveResponse = { success: true };

  if (!platform) return json(failure);

  const body = await request.json();
  const parsed = ArticleSaveRequestParser.safeParse(body);

  if (parsed.success) {
    const supa = new SupabaseClient(platform);
    const { data, error } = await supa.saveArticle(parsed.data);

    if (data) return json(success);
    if (error) return json(failure);
  }

  return json(failure);
};
