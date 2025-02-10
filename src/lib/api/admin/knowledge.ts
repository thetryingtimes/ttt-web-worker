import { z } from 'zod';

export const KnowledgeRequestEndpoint = `/admin/article/knowledge`;
export const KnowledgeRequestParser = z.object({
  files: z.array(z.string()),
  user_message: z.string()
});
export type KnowledgeRequestProps = z.infer<typeof KnowledgeRequestParser>;

export const KnowledgeResponseParser = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    markdown: z.string()
  }),
  z.object({
    success: z.literal(false)
  })
]);
export type KnowledgeResponseType = z.infer<typeof KnowledgeResponseParser>;
