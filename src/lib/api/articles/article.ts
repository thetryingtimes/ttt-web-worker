import { z } from 'zod';

export const ArticleSectionParser = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('section'),
    content: z.string()
  })
]);

export type ArticleSection = z.infer<typeof ArticleSectionParser>;

export const ArticleDraftParser = z.object({
  id: z.number().optional(),
  external_id: z.string(),
  published_at: z.string(),
  published: z.boolean(),
  category_id: z.string().nullable(),
  voting_enabled: z.boolean(),

  knowledge: z.string(),
  user_message: z.string().nullable(),

  content: z.object({
    title: z.string(),
    blurb: z.string(),
    sections: z.array(ArticleSectionParser)
  })
});

export type ArticleDraft = z.infer<typeof ArticleDraftParser>;

export const ArticleSaveEndpoint = '/admin/article/save';

export const ArticleSaveRequestParser = ArticleDraftParser;
export type ArticleSaveRequestProps = ArticleDraft;

export const ArticleSaveResponseParser = z.discriminatedUnion('success', [
  z.object({ success: z.literal(false) }),
  z.object({ success: z.literal(true) })
]);

export type ArticleSaveResponse = z.infer<typeof ArticleSaveResponseParser>;
