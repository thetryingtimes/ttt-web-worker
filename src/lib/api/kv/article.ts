import { z } from 'zod';
import { ArticleSectionParser } from '../articles/article';

export const CachedArticleParser = z.object({
  article: z.object({
    external_id: z.string(),
    published_at: z.string(),
    published: z.boolean(),
    category_id: z.string().nullable(),
    voting_enabled: z.boolean(),

    content: z.object({
      title: z.string(),
      blurb: z.string(),
      sections: z.array(ArticleSectionParser)
    })
  }),
  external_urls: z
    .object({
      reddit: z.string().optional()
    })
    .optional(),
  votes: z.object({
    support: z.number(),
    oppose: z.number(),
    shares: z.number().optional()
  })
});

export type CachedArticle = z.infer<typeof CachedArticleParser>;

export const getCachedArticleEndpoint = (external_id: string) =>
  `/-/article/${external_id}`;

export const GetCachedArticleResponseParser = z.discriminatedUnion('success', [
  z.object({ success: z.literal(false) }),
  z.object({ success: z.literal(true), cached_article: CachedArticleParser })
]);

export type GetCachedArticleResponse = z.infer<
  typeof GetCachedArticleResponseParser
>;
