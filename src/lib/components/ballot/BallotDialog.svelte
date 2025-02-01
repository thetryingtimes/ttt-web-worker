<script lang="ts">
  import type { CachedArticle } from '$lib/api/kv/article';
  import Dialog from '$lib/components/global/Dialog.svelte';
  import { slide } from 'svelte/transition';
  import ActionButton from '../global/ActionButton.svelte';
  import BallotRadio from './BallotRadio.svelte';
  import {
    GeoRequestEndpoint,
    GeoResponseParser,
    type GeoRequestProps,
    type GeoResponse
  } from '$lib/api/geo/geo';
  import { ApiClient } from '$lib/api/ApiClient';
  import {
    getVoteEndpoint,
    VoteResponseParser,
    type VoteRequestProps,
    type VoteResponse
  } from '$lib/api/ballots/vote';
  import BallotCastButton from './BallotCastButton.svelte';
  import { formatCountyAndState } from '$lib/utils/vote';
  import { shareArticle } from '$lib/utils/share';
  import { invalidateAll } from '$app/navigation';

  let {
    dialog = $bindable(),
    cached_article = $bindable(),
    selected,
    oncomplete
  }: {
    dialog: HTMLDialogElement;
    cached_article: CachedArticle;
    selected: 'support' | 'oppose';
    oncomplete: (success: boolean) => void;
  } = $props();

  let step: 'init' | 'cast' | 'confirmed' | 'blocked' = $state('init');
  let header = $derived(
    step === 'init' || step === 'cast'
      ? `Cast your vote`
      : step === 'confirmed'
        ? 'Vote confirmed!'
        : `You can't vote.`
  );
  let headerLabel = $derived(
    step === 'init' ? `(Step 1/2)` : step === 'cast' ? '(Step 2/2)' : ''
  );

  let locationLoading = $state(false);
  let gotLocationError = $state(false);
  let ballotLocation: VoteRequestProps | undefined = $state();
  // svelte-ignore non_reactive_update
  let finalVote: string;
  let ballotId: string | undefined = $state();
</script>

{#snippet initActions()}
  <p class="w-full text-center text-sm">Only readers in the US may vote.</p>
  <ActionButton
    label="Next: Confirm your Location"
    loading={locationLoading}
    disabled={locationLoading}
    onclick={() => {
      locationLoading = true;

      navigator.geolocation.getCurrentPosition(
        async (loc) => {
          const res = await ApiClient.post<GeoRequestProps, GeoResponse>(
            GeoRequestEndpoint,
            {
              lat: loc.coords.latitude,
              lng: loc.coords.longitude
            },
            GeoResponseParser
          );

          if (res && res.success) {
            ballotLocation = res.props;
            gotLocationError = false;
            locationLoading = false;
            step = 'cast';
          } else {
            gotLocationError = true;
            locationLoading = false;
            ballotLocation = undefined;
            step = 'blocked';
          }
        },
        () => {
          gotLocationError = true;
          locationLoading = false;
        }
      );
    }}
  />
{/snippet}

{#snippet castActions()}
  <p class="w-full text-center text-sm">Tap and hold to cast your ballot!</p>
  <BallotCastButton
    oncomplete={async () => {
      if (ballotLocation) {
        const res = await ApiClient.post<VoteRequestProps, VoteResponse>(
          getVoteEndpoint(cached_article.article.external_id, selected),
          ballotLocation,
          VoteResponseParser
        );

        if (res && res.success) {
          ballotId = res.ballot_id;
          finalVote = selected.toString();
          step = 'confirmed';
          await invalidateAll();
        } else {
          step = 'blocked';
        }
      }
    }}
  />
{/snippet}

{#snippet confirmedActions()}
  <ActionButton
    label="Share"
    icon="ios_share"
    onclick={async () => {
      await shareArticle(cached_article.article.external_id);
    }}
  />
  <ActionButton
    label="Done"
    onclick={() => {
      oncomplete(true);
      dialog.close();
    }}
  />
{/snippet}

{#snippet blockedActions()}
  <ActionButton
    label="Done"
    onclick={() => {
      oncomplete(false);
      dialog.close();
    }}
  />
{/snippet}

<Dialog
  bind:dialog
  header={`${header} <span class="text-white/50">${headerLabel}</span>`}
  actions={step === 'init'
    ? initActions
    : step === 'cast'
      ? castActions
      : step === 'confirmed'
        ? confirmedActions
        : step === 'blocked'
          ? blockedActions
          : undefined}
>
  {#if step !== 'blocked'}
    <div>
      <h3 class="line-clamp-3 font-bold">
        {cached_article.article.content.title}
      </h3>
      <p class="line-clamp-2">{cached_article.article.content.blurb}</p>
    </div>
  {/if}
  {#if step === 'init' || step === 'cast'}
    <BallotRadio bind:value={selected} />
  {/if}
  {#if step === 'init' && gotLocationError}
    <p in:slide>
      Only readers in the US are permitted to vote. Your exact location is not
      stored. Please verify your location to continue. Refer to our <a
        href="/privacy-policy"
        class="font-bold underline"
        target="_blank">privacy policy</a
      > for details.
    </p>
  {/if}
  {#if step === 'cast' && ballotLocation}
    <p>
      <strong>Location:{' '}</strong>
      {formatCountyAndState(ballotLocation)}
    </p>
  {/if}
  {#if step === 'confirmed'}
    <div class="flex flex-col gap-1">
      <p>
        <strong>How do you vote?{' '}</strong>
        <span class="uppercase">{finalVote}</span>
      </p>
      {#if ballotLocation}
        <p>
          <strong>Location:{' '}</strong>
          {formatCountyAndState(ballotLocation)}
        </p>
      {/if}
      {#if ballotId}
        <p>
          <strong>Ballot ID:{' '}</strong>
          {ballotId}
        </p>
      {/if}
    </div>
    <p>
      <strong>Thanks for supporting democracy!</strong> Share with your friends to
      increase your impact.
    </p>
  {/if}
  {#if step === 'blocked'}
    <p>You have been prevented from voting for one of the following reasons:</p>
    <ul class="list-decimal pl-8">
      <li>Your location is not in the US</li>
      <li>You have already voted</li>
      <li>You have been blocked</li>
    </ul>
  {/if}
</Dialog>
