<script lang="ts">
  import ActionButton from './ActionButton.svelte';
  import Dialog from './Dialog.svelte';
  let dialog: HTMLDialogElement;
</script>

<section aria-label="The Trying Times' Impact" class="bg-ttt">
  <div
    class="m-auto flex flex-col items-center gap-4 p-4 text-center text-sm text-white"
  >
    <p>
      <strong>Your vote is your voice.</strong> TTT is building a news platform
      to fight billionaires,
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
    <div class="flex gap-4">
      <p class="flex items-center gap-1">
        <span class="material-symbols-outlined">moving</span><strong
          >Total Votes:</strong
        > 1M
      </p>
      <p class="flex items-center gap-1">
        <span class="material-symbols-outlined">person</span><strong
          >Daily Readers:</strong
        > 123K
      </p>
    </div>
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
    label="Let's go!"
    onclick={() => {
      dialog.close();
    }}
  />
{/snippet}

<Dialog bind:dialog {actions}>
  <h2 class="text-xl md:text-2xl">
    <strong>
      Billionaires control our food, healthcare, media — and government.
    </strong>
  </h2>
  <p>
    <strong>The game is rigged, but we found a loophole.</strong>
    Here’s how to help:
  </p>
  <ol class="flex flex-col gap-6">
    <li class="flex gap-2">
      <span
        class="flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full border border-white text-lg font-bold"
        >1</span
      >
      <p class="pt-0.5">
        <strong class="text-xl font-bold">Skip the rage-bait</strong><br />We
        publish articles based on legislation, not tweets, informing you of the
        facts.
      </p>
    </li>
    <li class="flex gap-2">
      <span
        class="flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full border border-white text-lg font-bold"
        >2</span
      >
      <p class="pt-0.5">
        <strong class="text-xl font-bold">Vote like Congress</strong><br />Your
        vote is your voice — use it to support or oppose legislation, one vote
        per article.
      </p>
    </li>
    <li class="flex gap-2">
      <span
        class="flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full border border-white text-lg font-bold"
        >3</span
      >
      <p class="pt-0.5">
        <strong class="text-xl font-bold">Share to build IRL pressure</strong
        ><br />It will take all of us to hold Congress accountable in their next
        election.
      </p>
    </li>
  </ol>
</Dialog>
