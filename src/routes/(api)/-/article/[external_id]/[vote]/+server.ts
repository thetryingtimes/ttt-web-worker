import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
  VoteRequestPropsParser,
  type VoteResponse
} from '$lib/api/ballots/vote';
import { nanoid } from 'nanoid';
import { SupabaseClient } from '$lib/server/utils/supabase';
import type { Ballot } from '$lib/api/ballots/ballot';

export const POST: RequestHandler = async ({
  platform,
  params,
  locals,
  request
}) => {
  const failure: VoteResponse = { success: false };

  if (!platform) return json(failure);
  if (!locals.user_id) return json(failure);

  const req = await request.json();
  const parsed = VoteRequestPropsParser.safeParse(req);

  if (!parsed.success) return json(failure);

  const article_external_id = params.external_id;
  const voted_support = params.vote === 'support';
  const voted_oppose = params.vote === 'oppose';
  const ballot_id = nanoid();

  const supa = new SupabaseClient(platform);

  const valid_article =
    await supa.userVotingOnValidArticle(article_external_id);

  if (!valid_article) return json(failure);

  const can_vote = await supa.userCanVote(article_external_id, locals.user_id);

  if (!can_vote) return json(failure);

  const ballot: Ballot = {
    article_external_id,
    stytch_user_id: locals.user_id,
    ballot_id,
    support: voted_support,
    oppose: voted_oppose,
    county: parsed.data.county,
    state: parsed.data.state
  };

  const { error } = await supa.userCreateBallot(ballot);

  if (error) return json(failure);

  await platform.env.TABULATOR.send({
    article_external_id,
    support: voted_support,
    oppose: voted_oppose
  });

  return json({ success: true, ballot_id } as VoteResponse);
};
