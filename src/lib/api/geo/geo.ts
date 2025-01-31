import { z } from 'zod';
import { VoteRequestPropsParser } from '../ballots/vote';

export const GeoRequestEndpoint = `/-/geo`;

export const GeoRequestParser = z.object({
  lat: z.number(),
  lng: z.number()
});

export type GeoRequestProps = z.infer<typeof GeoRequestParser>;

export const GeoResponseParser = z.discriminatedUnion('success', [
  z.object({ success: z.literal(false) }),
  z.object({ success: z.literal(true), props: VoteRequestPropsParser })
]);

export type GeoResponse = z.infer<typeof GeoResponseParser>;
