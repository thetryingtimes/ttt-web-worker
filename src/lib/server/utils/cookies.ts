export const getCookieOptions = (
  url: string
): import('cookie').CookieSerializeOptions & { path: string } => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);

  // localhost…
  const is_insecure = url.startsWith('http://localhost');

  return {
    path: '/',
    expires,
    httpOnly: is_insecure ? false : true,
    secure: is_insecure ? false : true
  };
};
