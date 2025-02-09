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
  import ArticleHeader from './ArticleHeader.svelte';

  let { external_id }: { external_id: string } = $props();
  let loading = $state(true);
  let error = $state(false);
  let cached_article: CachedArticle | undefined = $state();
  let inventoryEl: HTMLDivElement;

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
      inventoryEl.dispatchEvent(new Event('load_error'));
    }
  });
</script>

<div data-inventory-after bind:this={inventoryEl}>
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
        <ArticleHeader bind:cached_article />
        <div class="group">
          <h2 class="mt-2">
            <a
              href={`/${cached_article.article.external_id}`}
              class="font-serif text-2xl text-pretty md:text-3xl"
              >{cached_article.article.content.title}</a
            >
          </h2>
          <p class="mt-1">
            <a
              href={`/${cached_article.article.external_id}`}
              class="text-pretty"
            >
              {cached_article.article.content.blurb}&nbsp;<span
                class="font-cond text-ttt whitespace-nowrap uppercase group-hover:underline"
                >Read &gt;&gt;</span
              >
            </a>
          </p>
        </div>
      </div>
      <ArticleNav bind:cached_article />
    </article>
  {/if}
</div>
