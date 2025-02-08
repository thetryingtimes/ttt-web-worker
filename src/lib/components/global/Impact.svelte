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

  const lsKey = 'impactV2AutoShown';

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
      const autoShown = localStorage.getItem(lsKey);

      if (autoShown !== 'yes') {
        dialog.showModal();
        localStorage.setItem(lsKey, 'yes');
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
      <strong>Your vote is your voice!</strong> The Trying Times is holding
      Congress accountable,
      <a
        href="#impact"
        aria-label="Click to read about The Trying Times"
        class="underline focus:ring-white"
        onclick={(e) => {
          e.preventDefault();
          dialog.showModal();
        }}
      >
        <strong>here's how</strong>
      </a>.
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
    label="Invite friends"
    icon="ios_share"
    onclick={() => {
      try {
        navigator.share({ url: `https://thetryingtimes.com` });
      } catch (e) {}
    }}
  />
  <ActionButton
    label="Let's go!"
    onclick={() => {
      dialog.close();
    }}
  />
{/snippet}

<Dialog bind:dialog {actions} header="Hold Congress accountable">
  <p class="text-pretty">
    The Trying Times is a news platform building public pressure to hold
    Congress accountable. <strong>Here’s how to get involved:</strong>
  </p>
  <ol class="flex flex-col gap-6">
    <li class="flex gap-2">
      <span
        class="flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full border border-white text-lg font-bold"
        >1</span
      >
      <p class="pt-0.5">
        <strong class="text-xl font-bold"
          >Learn how laws &amp; policy will impact your life</strong
        >
      </p>
    </li>
    <li class="flex gap-2">
      <span
        class="flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full border border-white text-lg font-bold"
        >2</span
      >
      <p class="pt-0.5">
        <strong class="text-xl font-bold"
          >Vote to SUPPORT or OPPOSE, just like Congress</strong
        >
      </p>
    </li>
    <li class="flex gap-2">
      <span
        class="flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full border border-white text-lg font-bold"
        >3</span
      >
      <p class="pt-0.5">
        <strong class="text-xl font-bold"
          >Share to build pressure politicians can’t ignore</strong
        >
      </p>
    </li>
  </ol>
</Dialog>
