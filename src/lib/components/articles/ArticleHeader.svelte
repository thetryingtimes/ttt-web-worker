<script lang="ts">
  import { getCategoryById } from '$lib/api/articles/category';
  import type { CachedArticle } from '$lib/api/kv/article';
  import { getFormattedDate } from '$lib/utils/date';
  import { plural } from '$lib/utils/text';
  import { millify } from 'millify';
  import Pill from '$lib/components/global/Pill.svelte';

  let {
    cached_article = $bindable(),
    pinned = false
  }: { cached_article: CachedArticle; pinned?: boolean } = $props();

  let article_category = $derived(
    getCategoryById(cached_article.article.category_id)
  );
</script>

<header class="flex items-center gap-2">
  {#if article_category}
    <Pill text={article_category.name} theme={article_category.theme} />
  {/if}
  {#if pinned}
    <div class="flex items-center">
      <span class="material-symbols-outlined is-pinned" aria-hidden="true"
        >keep</span
      >
      <span class="font-cond text-sm uppercase">Pinned</span>
    </div>
  {/if}
  {#if !pinned}
    <p class="font-cond text-sm leading-1 text-gray-500 uppercase">
      {getFormattedDate(
        new Date(Date.parse(cached_article.article.published_at + 'T00:00:00')),
        'medium'
      )}
    </p>
  {/if}
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

<style>
  .is-pinned {
    font-size: 18px;
  }
</style>
