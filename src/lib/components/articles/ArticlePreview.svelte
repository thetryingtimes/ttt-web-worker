<script lang="ts">
  import { ApiClient } from '$lib/api/ApiClient';
  import {
    getCachedArticleEndpoint,
    type GetCachedArticleResponse,
    GetCachedArticleResponseParser,
    type CachedArticle
  } from '$lib/api/kv/article';
  import { onMount } from 'svelte';

  let { external_id }: { external_id: string } = $props();
  let loading = $state(true);
  let error = $state(false);
  let cached_article: CachedArticle | undefined = $state();

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
    }
  });
</script>

{#if loading && !error}
  Loading…
{:else if error}{:else if cached_article}
  {JSON.stringify(cached_article)}
{/if}
