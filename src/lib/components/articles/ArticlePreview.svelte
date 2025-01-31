<script lang="ts">
  import { ApiClient } from '$lib/api/ApiClient';
  import {
    getCachedArticleEndpoint,
    type GetCachedArticleResponse,
    GetCachedArticleResponseParser,
    type CachedArticle
  } from '$lib/api/kv/article';
  import { onMount } from 'svelte';
  import ArticleNav from './ArticleNav.svelte';
  import Pill from '../global/Pill.svelte';
  import {
    getCategoryById,
    type ArticleCategory
  } from '$lib/api/articles/category';
  import { getFormattedDate } from '$lib/utils/date';
  import { millify } from 'millify';
  import { plural } from '$lib/utils/text';

  let { external_id }: { external_id: string } = $props();
  let loading = $state(true);
  let error = $state(false);
  let cached_article: CachedArticle | undefined = $state();
  let article_category: ArticleCategory | undefined = $state();

  onMount(async () => {
    const res = await ApiClient.get<GetCachedArticleResponse>(
      getCachedArticleEndpoint(external_id),
      GetCachedArticleResponseParser
    );

    if (res && res.success && res.cached_article)
      cached_article = res.cached_article;

    loading = false;

    if (!cached_article) {
      error = true;
    } else {
      article_category = getCategoryById(cached_article.article.category_id);
    }
  });
</script>

{#if loading && !error}
  <div class="px-4">
    <div class="flex flex-col gap-2 overflow-hidden">
      <div class="h-20 animate-pulse bg-gray-300"></div>
      <div class="animation-delay-med h-12 animate-pulse bg-gray-300"></div>
      <div class="animation-delay-long h-8 animate-pulse bg-gray-300"></div>
    </div>
  </div>
{:else if error}{:else if cached_article}
  <article class="flex flex-col gap-4 px-4">
    <div>
      <header class="flex items-center gap-2">
        {#if article_category}
          <Pill text={article_category.name} theme={article_category.theme} />
        {/if}
        <p class="font-cond text-sm leading-1 text-gray-500 uppercase">
          {getFormattedDate(
            new Date(Date.parse(cached_article.article.published_at)),
            'medium'
          )}
        </p>
        {#if cached_article.article.voting_enabled}
          <p class="font-cond text-sm leading-1 text-gray-500 uppercase">•</p>
          <p class="font-cond text-sm leading-1 text-gray-500 uppercase">
            {millify(
              cached_article.votes.support + cached_article.votes.oppose
            )}{' '}{plural(
              cached_article.votes.support + cached_article.votes.oppose,
              'vote',
              'votes'
            )}
          </p>
        {/if}
      </header>
      <h2 class="mt-2">
        <a
          href={`/${cached_article.article.external_id}`}
          class="font-serif text-2xl text-pretty"
          >{cached_article.article.content.title}</a
        >
      </h2>
      <p>
        <a href={`/${cached_article.article.external_id}`} class="text-pretty">
          {cached_article.article.content.blurb}
          <span class="font-cond text-ttt uppercase">Read &gt;&gt;</span>
        </a>
      </p>
    </div>
    <ArticleNav bind:cached_article />
  </article>
{/if}
