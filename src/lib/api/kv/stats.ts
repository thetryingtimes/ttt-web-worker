import { z } from 'zod';

export const SiteStatsParser = z.object({
  total_votes: z.number(),
  daily_readers: z.number()
});

export type SiteStats = z.infer<typeof SiteStatsParser>;

export const SiteStatsEndpoint = `/-/stats`;

export const SiteStatsResponseParser = z.discriminatedUnion('success', [
  z.object({ success: z.literal(false) }),
  z.object({ success: z.literal(true), stats: SiteStatsParser })
]);

export type SiteStatsResponse = z.infer<typeof SiteStatsResponseParser>;
