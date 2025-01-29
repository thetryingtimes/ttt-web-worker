import { getCookieOptions } from '$lib/server/utils/cookies';
import type { Handle } from '@sveltejs/kit';
import * as stytch from 'stytch';

export const handle: Handle = async ({ event, resolve }) => {
  const session_token = event.cookies.get('session');

  if (session_token && event.platform) {
    const stytchClient = new stytch.Client({
      project_id: event.platform.env.STYTCH_PROJECT_ID,
      secret: event.platform.env.STYTCH_SECRET
    });

    try {
      const res = await stytchClient.sessions.authenticate({
        session_token,
        session_duration_minutes: 60 * 24 * 30
      });

      if (res.session_token) {
        event.cookies.set('session', res.session_token, getCookieOptions());
        event.locals.user_id = res.user.user_id;
      }
    } catch (e) {
      event.cookies.delete('session', { path: '/' });
      event.locals.user_id = undefined;
    }
  }

  return await resolve(event);
};
