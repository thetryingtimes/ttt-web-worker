<script lang="ts">
  import type { CachedArticle } from '$lib/api/kv/article';
  import { millify } from 'millify';
  import ArticleBallotCoordinator from './ArticleBallotCoordinator.svelte';
  import { shareArticle } from '$lib/utils/share';
  import { page } from '$app/state';
  import type { UserBallot } from '$lib/api/ballots/ballot';

  let ballotCoordinator: ArticleBallotCoordinator;

  let { cached_article = $bindable() }: { cached_article: CachedArticle } =
    $props();

  let total_support = $derived(millify(cached_article.votes.support));
  let total_oppose = $derived(millify(cached_article.votes.oppose));

  let user_ballot: UserBallot | undefined = $derived.by(() => {
    return page.data.user_ballots.filter(
      (b) => b.article_external_id === cached_article.article.external_id
    )[0];
  });
</script>

<nav class="flex items-center justify-between md:justify-start md:gap-4">
  {#if cached_article.article.voting_enabled}
    {#if user_ballot}
      {#if user_ballot.support}
        <div
          class="border-ttt-green bg-ttt-green/10 font-cond flex items-center gap-1 rounded-sm border-2 p-1"
        >
          <span class="material-symbols-outlined" aria-hidden="true"
            >check_circle</span
          >
          YOU SUPPORT
          <span class="text-gray-500">{total_support}</span>
        </div>
      {:else}
        <div class="font-cond">
          SUPPORT
          <span class="text-gray-500">{total_support}</span>
        </div>
      {/if}
      {#if user_ballot.oppose}
        <div
          class="border-ttt-red bg-ttt-red/10 font-cond flex items-center gap-1 rounded-sm border-2 p-1"
        >
          <span class="material-symbols-outlined" aria-hidden="true"
            >check_circle</span
          >
          YOU OPPOSE
          <span class="text-gray-500">{total_oppose}</span>
        </div>
      {:else}
        <div class="font-cond">
          OPPOSE
          <span class="text-gray-500">{total_oppose}</span>
        </div>
      {/if}
    {:else}
      <button
        class="font-cond group flex items-center gap-1 uppercase"
        onclick={() => {
          ballotCoordinator.startBallot('support');
        }}
      >
        <span
          class="material-symbols-outlined filled text-ttt-green"
          aria-hidden="true">thumb_up</span
        >
        <span class="group-hover:underline">SUPPORT</span>
        <span class="text-gray-500">{total_support}</span>
      </button>
      <button
        class="font-cond group flex items-center gap-1 uppercase"
        onclick={() => {
          ballotCoordinator.startBallot('oppose');
        }}
      >
        <span
          class="material-symbols-outlined filled text-ttt-red"
          aria-hidden="true">thumb_down</span
        >
        <span class="group-hover:underline">OPPOSE</span>
        <span class="text-gray-500">{total_oppose}</span>
      </button>
    {/if}
  {/if}
  <button
    class="font-cond group flex items-center gap-1 uppercase"
    onclick={async () => {
      await shareArticle(cached_article.article.external_id);
    }}
  >
    <span class="material-symbols-outlined filled" aria-hidden="true"
      >ios_share</span
    >
    <span class="group-hover:underline">SHARE</span>
    <span class="text-gray-500"
      >{millify(cached_article.votes.shares || 0)}</span
    >
  </button>
</nav>

<ArticleBallotCoordinator bind:this={ballotCoordinator} bind:cached_article />
