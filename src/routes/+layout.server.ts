import type { SiteStats } from '$lib/api/kv/stats';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ platform, locals }) => {
  return {
    user_id: locals.user_id,
    stats:
      (platform &&
        (await platform.env.ARTICLES.get<SiteStats>('stats', 'json'))) ||
      undefined ||
      undefined
  };
};
