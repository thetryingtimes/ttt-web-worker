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
  import { plural } from '$lib/utils/text';
  import { getFormattedDate } from '$lib/utils/date';

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

  let totalVotes = $derived(
    cached_article.votes.support + cached_article.votes.oppose
  );
  let step: 'init' | 'cast' | 'confirmed' | 'blocked' | 'denied' =
    $state('init');
  let header = $derived(
    step === 'init' || step === 'cast'
      ? `Cast your vote`
      : step === 'confirmed'
        ? 'Vote confirmed!'
        : step === 'blocked'
          ? `You can't vote.`
          : `Permission required`
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
  <p class="w-full text-center text-sm">
    Only US readers may vote. Only county & state are stored.
  </p>
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
        (reason: GeolocationPositionError) => {
          if (reason.code === 1) step = 'denied';
          else gotLocationError = true;

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

{#snippet deniedActions()}
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
          : step === 'denied'
            ? deniedActions
            : undefined}
>
  {#if step === 'init' || step === 'cast' || step === 'confirmed'}
    <div>
      <div class="flex gap-2 text-sm font-bold text-white/80 uppercase">
        <span
          >{getFormattedDate(
            new Date(
              Date.parse(cached_article.article.published_at + 'T00:00:00')
            ),
            'medium'
          )}</span
        >
        <span>•</span>
        <span
          >{totalVotes}{' '}
          {plural(totalVotes, 'vote', 'votes')}</span
        >
      </div>
      <h3 class="line-clamp-2 font-bold">
        {cached_article.article.content.title}
      </h3>
      <p class="line-clamp-2">{cached_article.article.content.blurb}</p>
    </div>
  {/if}
  {#if step === 'init' || step === 'cast'}
    <BallotRadio bind:value={selected} {cached_article} />
  {/if}
  {#if step === 'init' && gotLocationError}
    <p in:slide>
      <strong>Trouble confirming your location?</strong> Make sure you're in the
      US and that your browser has location access. Only your county & state are
      stored. Refer to our
      <a href="/privacy-policy" class="font-bold underline" target="_blank"
        >privacy policy</a
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
    <p class="text-pretty">
      <strong>Thanks for supporting democracy!</strong> Share with your friends to
      increase your impact.
    </p>
  {/if}
  {#if step === 'blocked'}
    <p>You have been prevented from voting for one of the following reasons:</p>
    <ul class="list-decimal pl-8">
      <li>
        <strong>We couldn't confirm your location.</strong> Make sure your
        browser has location services enabled and
        <a
          href="#restart"
          class="font-bold underline"
          onclick={(e) => {
            e.preventDefault();
            step = 'init';
          }}>try again</a
        > if this was a mistake.
      </li>
      <li>
        <strong>You have already voted.</strong> Only one vote per user per article
        is allowed.
      </li>
      <li>
        <strong>You have been blocked.</strong> If we detect fraudulent activity
        on your account, you may be prevented from voting.
      </li>
    </ul>
  {/if}
  {#if step === 'denied'}
    <p>
      <strong>You declined to share your location.</strong> We require your
      location to restrict voting to US readers. Only your county & state are
      stored. Refer to our
      <a href="/privacy-policy" class="font-bold underline" target="_blank"
        >privacy policy</a
      > for details.
    </p>
    <p>
      <strong>If you want to try again,</strong> here's what you'll need to do:
    </p>
    <ul class="list-disc pl-8">
      <li>
        On iOS? Learn how to <a
          href="https://support.apple.com/guide/personal-safety/manage-location-services-settings-ips9bf20ad2f/web"
          target="_blank"
          class="font-bold underline">reset Location Services settings</a
        >.
      </li>
      <li>
        On Chrome or Android? Learn how to <a
          href="https://support.google.com/chrome/answer/114662?hl=en&co=GENIE.Platform%3DAndroid"
          target="_blank"
          class="font-bold underline">reset site settings permissions</a
        >.
      </li>
      <li>Otherwise, restart your browser and try again.</li>
    </ul>
  {/if}
</Dialog>
