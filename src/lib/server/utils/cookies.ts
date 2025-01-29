export const getCookieOptions = () => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);

  return {
    path: '/',
    expires,
    httpOnly: true
  };
};
