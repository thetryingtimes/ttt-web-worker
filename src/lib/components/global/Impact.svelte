<script lang="ts">
  import { onMount } from 'svelte';
  import ActionButton from './ActionButton.svelte';
  import Dialog from './Dialog.svelte';
  import { ApiClient } from '$lib/api/ApiClient';
  import {
    type SiteStats,
    SiteStatsEndpoint,
    type SiteStatsResponse,
    SiteStatsResponseParser
  } from '$lib/api/kv/stats';
  import { millify } from 'millify';
  import { page } from '$app/state';

  // svelte-ignore non_reactive_update
  let dialog: HTMLDialogElement;
  let stats: SiteStats | undefined = $state(page.data.stats);
  let interval_id: any;

  const loadStats = async () => {
    const res = await ApiClient.get<SiteStatsResponse>(
      SiteStatsEndpoint,
      SiteStatsResponseParser
    );

    if (res && res.success) {
      stats = res.stats;
    }
  };

  onMount(() => {
    try {
      const autoShown = localStorage.getItem('impactAutoShown');

      if (autoShown !== 'yes') {
        dialog.showModal();
        localStorage.setItem('impactAutoShown', 'yes');
      }
    } catch (e) {}

    interval_id = setInterval(async () => {
      await loadStats();
    }, 1000 * 60);

    return () => {
      clearInterval(interval_id);
    };
  });
</script>

<section aria-label="The Trying Times's Impact" class="bg-ttt">
  <div
    class="m-auto flex flex-col items-center gap-4 p-4 text-center text-sm text-white"
  >
    <p>
      <strong>Your vote is your voice.</strong> TTT is a news platform to fight
      billionaires,
      <a
        href="#impact"
        aria-label="Click to read about The Trying Times"
        class="underline focus:ring-white"
        onclick={(e) => {
          e.preventDefault();
          dialog.showModal();
        }}
      >
        <strong>and we need your help!</strong>
      </a>
    </p>
    {#if stats}
      <div class="flex gap-4">
        <p class="flex items-center gap-1">
          <span aria-hidden="true" class="material-symbols-outlined"
            >moving</span
          ><strong>Total Votes:</strong>
          {millify(stats.total_votes)}
        </p>
        <p class="flex items-center gap-1">
          <span aria-hidden="true" class="material-symbols-outlined"
            >person</span
          ><strong>Weekly Readers:</strong>
          {millify(stats.daily_readers)}
        </p>
      </div>
    {/if}
  </div>
</section>

{#snippet actions()}
  <ActionButton
    label="Share"
    icon="ios_share"
    onclick={() => {
      try {
        navigator.share({ url: `https://thetryingtimes.com` });
      } catch (e) {}
    }}
  />
  <ActionButton
    label="I'm in!"
    onclick={() => {
      dialog.close();
    }}
  />
{/snippet}

<Dialog
  bind:dialog
  {actions}
  header="Billionaires control our food, healthcare, media — and government."
>
  <p>
    <strong>
      It's a rigged game, but there's a loophole: public pressure.
    </strong> The Trying Times needs your help:
  </p>
  <ol class="flex flex-col gap-6">
    <li class="flex gap-2">
      <span
        class="flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full border border-white text-lg font-bold"
        >1</span
      >
      <p class="pt-0.5">
        <strong class="text-xl font-bold">Skip the rage-bait</strong><br />We
        publish news based on legislation, not tweets, informing you of the
        facts.
      </p>
    </li>
    <li class="flex gap-2">
      <span
        class="flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full border border-white text-lg font-bold"
        >2</span
      >
      <p class="pt-0.5">
        <strong class="text-xl font-bold">Vote on every article</strong><br
        />Make your voice heard by voting SUPPORT or OPPOSE on each article.
      </p>
    </li>
    <li class="flex gap-2">
      <span
        class="flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full border border-white text-lg font-bold"
        >3</span
      >
      <p class="pt-0.5">
        <strong class="text-xl font-bold">Share to build IRL pressure</strong
        ><br />When WE, THE PEOPLE speak up, we put pressure on billionaires and
        get change.
      </p>
    </li>
  </ol>
</Dialog>
