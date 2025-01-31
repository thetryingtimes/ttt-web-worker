import { type SiteStats, type SiteStatsResponse } from '$lib/api/kv/stats';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
  const failure: SiteStatsResponse = { success: false };

  if (!platform) return json(failure);

  const stats = await platform.env.ARTICLES.get<SiteStats>('stats', 'json');

  if (!stats) return json(failure);

  return json({ success: true, stats } as SiteStatsResponse);
};
