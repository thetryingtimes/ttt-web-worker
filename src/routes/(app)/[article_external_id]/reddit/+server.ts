import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { KVClient } from '$lib/server/utils/kv';

export const POST: RequestHandler = async ({ platform, params, request }) => {
  if (!platform) return json({ success: true });
  if (request.headers.get('X-Zap') !== platform.env.ZAP_SECRET)
    return json({ success: true });

  const data = await request.json();
  const parsed = z.object({ url: z.string() }).safeParse(data);

  if (parsed.success) {
    const kv = new KVClient(platform);
    await kv.putRedditUrl(params.article_external_id, parsed.data.url);
  }

  return json({ success: true });
};
