import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as stytch from 'stytch';
import {
  VerifyRequestParser,
  type VerifyResponseType
} from '$lib/api/account/auth/verify';
import { getCookieOptions } from '$lib/server/utils/cookies';

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
  const failure: VerifyResponseType = { success: false };
  if (!platform) return json(failure);

  const parsed = VerifyRequestParser.safeParse(await request.json());
  if (!parsed.success) return json(failure);

  const stytchClient = new stytch.Client({
    project_id: platform.env.STYTCH_PROJECT_ID,
    secret: platform.env.STYTCH_SECRET
  });

  try {
    const res = await stytchClient.otps.authenticate({
      method_id: parsed.data.method_id,
      code: parsed.data.code,
      session_duration_minutes: 60 * 24 * 30
    });

    cookies.set('session', res.session_token, getCookieOptions(request.url));

    const success: VerifyResponseType = { success: true };
    return json(success);
  } catch (e) {
    console.log('>> verify:', e);
    return json(failure);
  }
};
