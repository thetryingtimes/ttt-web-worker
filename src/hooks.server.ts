import { getCookieOptions } from '$lib/server/utils/cookies';
import { redirect, type Handle } from '@sveltejs/kit';
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
        event.cookies.set(
          'session',
          res.session_token,
          getCookieOptions(event.request.url)
        );
        event.locals.user_id = res.user.user_id;
      }
    } catch (e) {
      event.cookies.delete('session', { path: '/' });
      event.locals.user_id = undefined;
    }
  }

  if (event.route?.id?.startsWith('/(admin)')) {
    let allowed = false;

    if (
      typeof event.locals.user_id === 'string' &&
      event.platform?.env?.ADMIN_USER_ID === event.locals.user_id
    ) {
      allowed = true;
    }

    if (!allowed) throw redirect(301, '/');
  }

  return await resolve(event);
};
