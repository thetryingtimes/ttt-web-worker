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

  let {
    external_id,
    pinned = false
  }: { external_id: string; pinned?: boolean } = $props();
  let loading = $state(true);
  let error = $state(false);
  let cached_article: CachedArticle | undefined = $state();

  let root: HTMLDivElement;
  let io: IntersectionObserver;

  const load = async () => {
    const res = await ApiClient.get<GetCachedArticleResponse>(
      getCachedArticleEndpoint(external_id),
      GetCachedArticleResponseParser
    );

    if (res && res.success && res.cached_article)
      cached_article = res.cached_article;

    loading = false;

    if (!cached_article) {
      error = true;
    }
  };

  onMount(async () => {
    io = new IntersectionObserver(async (entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        io.disconnect();
        await load();
      }
    });

    io.observe(root);
  });
</script>

<div bind:this={root}>
  {#if loading && !error}
    <div class="px-4">
      <div class="flex flex-col gap-2 overflow-hidden">
        <div class="h-20 animate-pulse bg-gray-300"></div>
        <div class="animation-delay-med h-12 animate-pulse bg-gray-300"></div>
        <div class="animation-delay-long h-8 animate-pulse bg-gray-300"></div>
      </div>
    </div>
  {:else if error}{:else if cached_article}
    <article
      class="flex flex-col gap-4 rounded-2xl px-4 {pinned ? `bg-ttt/2` : ``}"
      class:border-2={pinned}
      class:border-ttt={pinned}
      class:py-4={pinned}
      class:mx-4={pinned}
    >
      <div>
        <ArticleHeader bind:cached_article {pinned} />
        <div class="group">
          <h2 class="mt-2">
            <a
              href={`/${cached_article.article.external_id}`}
              class="font-serif text-2xl text-pretty md:text-3xl"
              >{cached_article.article.content.title}</a
            >
          </h2>
          <p class="mt-1 {pinned ? `hidden md:block` : ``}">
            <a
              href={`/${cached_article.article.external_id}`}
              class="text-pretty"
            >
              {cached_article.article.content.blurb}&nbsp;<span
                class="font-cond text-ttt whitespace-nowrap uppercase group-hover:underline"
                >Read&nbsp;&gt;&gt;</span
              >
            </a>
          </p>
        </div>
      </div>
      <ArticleNav bind:cached_article />
    </article>
  {/if}
</div>
