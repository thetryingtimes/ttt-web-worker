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
          oppose: 0
        }
      };
    }

    await this.platform.env.ARTICLES.put(
      `article:${toCache.article.external_id}`,
      JSON.stringify(toCache)
    );
  }

  async getArticleByExternalId(external_id: string) {
    return this.platform.env.ARTICLES.get<CachedArticle>(
      `article:${external_id}`,
      'json'
    );
  }
}
