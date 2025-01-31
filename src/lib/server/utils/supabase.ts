import type { ArticleDraft } from '$lib/api/articles/article';
import { createClient } from '@supabase/supabase-js';
import { type Database } from './supabase.d';

export class SupabaseClient {
  private platform;
  private client;

  constructor(platform: App.Platform) {
    this.platform = platform;

    this.client = createClient<Database>(
      platform.env.SUPABASE_PROJECT_URL,
      platform.env.SUPABASE_PUBLIC_ANON_KEY
    );
  }

  async publicGetHomepageExternalIds(after_external_id?: string) {
    return this.client
      .from('articles')
      .select('external_id')
      .eq('published', true)
      .order('published_at', { ascending: false });
  }

  async adminSaveArticle(draft: ArticleDraft) {
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
