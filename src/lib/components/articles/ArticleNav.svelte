<script lang="ts">
  import type { CachedArticle } from '$lib/api/kv/article';
  import { millify } from 'millify';
  import ArticleBallotCoordinator from './ArticleBallotCoordinator.svelte';
  import { shareArticle } from '$lib/utils/share';

  let ballotCoordinator: ArticleBallotCoordinator;

  let { cached_article = $bindable() }: { cached_article: CachedArticle } =
    $props();

  let total_votes = $derived(
    cached_article.votes.support + cached_article.votes.oppose
  );
  let percent_support = $derived(
    Math.floor((cached_article.votes.support / (total_votes || 1)) * 100)
  );
  let percent_oppose = $derived(
    Math.floor((cached_article.votes.oppose / (total_votes || 1)) * 100)
  );
</script>

<nav class="flex items-center justify-between md:justify-start md:gap-4">
  {#if cached_article.article.voting_enabled}
    <button
      class="font-cond flex items-center gap-1 uppercase"
      onclick={() => {
        ballotCoordinator.startBallot('support');
      }}
    >
      <span
        class="material-symbols-outlined filled text-ttt-green"
        aria-hidden="true">thumb_up</span
      >
      SUPPORT
      <span class="text-gray-500">{percent_support}%</span>
    </button>
    <button
      class="font-cond flex items-center gap-1 uppercase"
      onclick={() => {
        ballotCoordinator.startBallot('oppose');
      }}
    >
      <span
        class="material-symbols-outlined filled text-ttt-red"
        aria-hidden="true">thumb_down</span
      >
      OPPOSE
      <span class="text-gray-500">{percent_oppose}%</span>
    </button>
  {/if}
  <button
    class="font-cond flex items-center gap-1 uppercase"
    onclick={async () => {
      await shareArticle(cached_article.article.external_id);
    }}
  >
    <span class="material-symbols-outlined filled" aria-hidden="true"
      >ios_share</span
    >
    SHARE
    <span class="text-gray-500"
      >{millify(cached_article.votes.shares || 0)}</span
    >
  </button>
</nav>

<ArticleBallotCoordinator bind:this={ballotCoordinator} bind:cached_article />
