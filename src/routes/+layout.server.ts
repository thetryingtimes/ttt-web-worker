import type { UserBallot } from '$lib/api/ballots/ballot';
import type { SiteStats } from '$lib/api/kv/stats';
import { SupabaseClient } from '$lib/server/utils/supabase';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ platform, locals }) => {
  let user_ballots: UserBallot[] = [];

  if (platform && locals.user_id) {
    const supa = new SupabaseClient(platform);
    user_ballots = await supa.userGetBallots(locals.user_id);
  }

  return {
    user_id: locals.user_id,
    user_ballots,
    stats:
      (platform &&
        (await platform.env.ARTICLES.get<SiteStats>('stats', 'json'))) ||
      undefined ||
      undefined
  };
};
