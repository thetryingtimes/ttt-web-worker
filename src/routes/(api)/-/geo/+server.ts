import { GeoRequestParser, type GeoResponse } from '$lib/api/geo/geo';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GoogleMapsClient } from '$lib/server/utils/google';
import { R2Logger } from '$lib/server/utils/logger';

export const POST: RequestHandler = async ({ platform, request }) => {
  const failure: GeoResponse = { success: false };

  if (!platform) return json(failure);

  const req = await request.json();
  const parsed = GeoRequestParser.safeParse(req);

  if (!parsed.success) {
    console.log('> [geo] failed to parse', JSON.stringify(req, null, 2));

    await R2Logger.log(platform, {
      err: `[geo] failed to parse`,
      req
    });

    return json(failure);
  }

  const res = await GoogleMapsClient.geocode(
    platform,
    parsed.data.lat,
    parsed.data.lng
  );

  return json(res);
};
