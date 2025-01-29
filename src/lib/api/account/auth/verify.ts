import { z } from 'zod';

export const VerifyRequestEndpoint = `/-/account/auth/verify`;
export const VerifyRequestParser = z.object({
  method_id: z.string(),
  code: z.string()
});
export type VerifyRequestProps = z.infer<typeof VerifyRequestParser>;

export const VerifyResponseParser = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true)
  }),
  z.object({
    success: z.literal(false)
  })
]);
export type VerifyResponseType = z.infer<typeof VerifyResponseParser>;
