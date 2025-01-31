import type { ArticleDraft } from '$lib/api/articles/article';
import { createClient } from '@supabase/supabase-js';
import { type Database } from './supabase.d';
import { KVClient } from './kv';
import type { Ballot } from '$lib/api/ballots/ballot';

export class SupabaseClient {
  private platform;
  private client;
  private kv;

  constructor(platform: App.Platform) {
    this.platform = platform;

    this.client = createClient<Database>(
      platform.env.SUPABASE_PROJECT_URL,
      platform.env.SUPABASE_PUBLIC_ANON_KEY
    );

    this.kv = new KVClient(platform);
  }

  async publicGetHomepageExternalIds(after_external_id?: string) {
    return this.client
      .from('articles')
      .select('external_id')
      .eq('published', true)
      .order('published_at', { ascending: false });
  }

  async userCreateBallot(ballot: Ballot) {
    return this.client.from('ballots').insert(ballot);
  }

  async userVotingOnValidArticle(article_external_id: string) {
    const { data } = await this.client
      .from('articles')
      .select()
      .eq('article_external_id', article_external_id);

    return data?.length === 1 && data[0].voting_enabled === true;
  }

  async userCanVote(article_external_id: string, stytch_user_id: string) {
    const { data } = await this.client
      .from('ballots')
      .select()
      .eq('article_external_id', article_external_id)
      .eq('stytch_user_id', stytch_user_id);

    return data?.length === 0;
  }

  async adminSaveArticle(draft: ArticleDraft) {
    await this.kv.putArticle(draft);

    return this.client
      .from('articles')
      .upsert(draft, {
        onConflict: 'external_id'
      })
      .select();
  }

  async adminListArticles() {
    return this.client
      .from('articles')
      .select()
      .order('id', { ascending: false })
      .limit(25);
  }

  async adminGetArticleByExternalId(external_id: string) {
    return this.client.from('articles').select().eq('external_id', external_id);
  }
}
