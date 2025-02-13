import type { ArticleDraft } from '$lib/api/articles/article';
import type { CachedArticle } from '$lib/api/kv/article';

export class KVClient {
  private platform;

  constructor(platform: App.Platform) {
    this.platform = platform;
  }

  async putArticle(draft: ArticleDraft) {
    const existing = await this.getArticleByExternalId(draft.external_id);
    let toCache: CachedArticle;

    if (existing) {
      toCache = {
        article: draft,
        votes: existing.votes
      };
    } else {
      toCache = {
        article: draft,
        votes: {
          support: 0,
          oppose: 0,
          shares: 0
        }
      };
    }

    await this.put(toCache);
  }

  async put(article: CachedArticle) {
    await this.platform.env.ARTICLES.put(
      `article:${article.article.external_id}`,
      JSON.stringify(article)
    );
  }

  async getArticleByExternalId(external_id: string) {
    return this.platform.env.ARTICLES.get<CachedArticle>(
      `article:${external_id}`,
      'json'
    );
  }

  async putRedditUrl(external_id: string, reddit_url: string) {
    const existing = await this.getArticleByExternalId(external_id);

    if (existing) {
      if (!existing.external_urls) existing.external_urls = {};
      existing.external_urls.reddit = reddit_url;

      await this.put(existing);
    }
  }
}
