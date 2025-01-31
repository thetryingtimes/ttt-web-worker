import { z } from 'zod';

// sent to the queue after a vote is confirmed to count it
export type VoteMessage = {
  article_external_id: string;
  support?: boolean;
  oppose?: boolean;
};

export const BallotParser = z.object({
  id: z.number().optional(),
  article_external_id: z.string(),
  stytch_user_id: z.string(),
  ballot_id: z.string(),
  support: z.boolean().optional(),
  oppose: z.boolean().optional(),
  county: z.string(),
  state: z.string()
});

export type Ballot = z.infer<typeof BallotParser>;
