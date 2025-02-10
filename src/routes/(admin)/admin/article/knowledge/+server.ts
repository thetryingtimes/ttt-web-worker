import type { RequestHandler } from './$types';
import {
  KnowledgeRequestParser,
  type KnowledgeResponseType
} from '$lib/api/admin/knowledge';
import Anthropic from '@anthropic-ai/sdk';
import { json } from '@sveltejs/kit';
import { prompt } from './prompt';

export const POST: RequestHandler = async ({ platform, request }) => {
  const failure: KnowledgeResponseType = { success: false };

  if (!platform?.env) return json(failure);

  const req = await request.json();
  const parsed = KnowledgeRequestParser.safeParse(req);

  if (!parsed.success) return json(failure);

  const anthropic = new Anthropic({
    apiKey: platform.env.ANTHROPIC_API_KEY
  });

  const messages: Anthropic.Messages.MessageParam[] = parsed.data.files.map(
    (base64_file) => ({
      role: 'user',
      content: [
        {
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: base64_file
          }
        }
      ]
    })
  );

  messages.push({
    role: 'user',
    content: [
      {
        type: 'text',
        text: prompt
      }
    ]
  });

  if (parsed.data.user_message !== '')
    messages.push({
      role: 'user',
      content: [
        {
          type: 'text',
          text: `Additional instructions:\n${parsed.data.user_message}`
        }
      ]
    });

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-latest',
    max_tokens: 2056,
    messages
  });

  if (message.content[0].type === 'text') {
    const success: KnowledgeResponseType = {
      success: true,
      markdown: message.content[0].text
    };

    return json(success);
  }

  return json(failure);
};
