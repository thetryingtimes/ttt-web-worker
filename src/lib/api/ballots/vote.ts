import { z } from 'zod';

export const getVoteEndpoint = (
  article_external_id: string,
  value: 'support' | 'oppose'
) => `/-/article/${article_external_id}/${value}`;

export const VoteRequestPropsParser = z.object({
  county: z.string(),
  state: z.string()
});

export type VoteRequestProps = z.infer<typeof VoteRequestPropsParser>;

export const VoteResponseParser = z.discriminatedUnion('success', [
  z.object({ success: z.literal(false) }),
  z.object({ success: z.literal(true), ballot_id: z.string() })
]);

export type VoteResponse = z.infer<typeof VoteResponseParser>;
