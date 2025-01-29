import { z } from 'zod';

export const LoginRequestEndpoint = `/-/account/auth/login`;
export const LoginRequestParser = z.object({
  phone_number: z.string()
});
export type LoginRequestProps = z.infer<typeof LoginRequestParser>;

export const LoginResponseParser = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    method_id: z.string()
  }),
  z.object({
    success: z.literal(false)
  })
]);
export type LoginResponseType = z.infer<typeof LoginResponseParser>;
