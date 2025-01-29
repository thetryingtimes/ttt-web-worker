import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as stytch from 'stytch';
import {
  LoginRequestParser,
  type LoginResponseType
} from '$lib/api/account/auth/login';

export const POST: RequestHandler = async ({ request, platform }) => {
  const failure: LoginResponseType = { success: false };

  if (!platform) return json(failure);

  const parsed = LoginRequestParser.safeParse(await request.json());
  if (!parsed.success) return json(failure);

  const stytchClient = new stytch.Client({
    project_id: platform.env.STYTCH_PROJECT_ID,
    secret: platform.env.STYTCH_SECRET
  });

  try {
    const res = await stytchClient.otps.sms.loginOrCreate({
      phone_number: parsed.data.phone_number
    });

    const success: LoginResponseType = {
      success: true,
      method_id: res.phone_id
    };

    return json(success);
  } catch (e) {
    console.log('>> login:', e);
    return json(failure);
  }
};
