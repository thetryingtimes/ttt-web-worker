import { text, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  return text(`google.com, pub-8548253373322481, DIRECT, f08c47fec0942fa0`);
};
