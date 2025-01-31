<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
  import { slide } from 'svelte/transition';
  import RoundButton from './RoundButton.svelte';
  import Pill from './Pill.svelte';
  import IdentityDialog from '../account/IdentityDialog.svelte';
  import { page } from '$app/state';
  import { LogoutRequestEndpoint } from '$lib/api/account/auth/logout';

  let { admin = false }: { admin?: boolean } = $props();
  let currentMenu = $state<'main' | 'account' | ''>('');

  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long'
  }).format(date);

  // svelte-ignore non_reactive_update
  let registerDialog: HTMLDialogElement;
</script>

<nav
  class="sticky top-0 z-10 flex flex-col gap-0 border-b border-b-gray-400 bg-gray-100"
>
  <div
    class="m-auto flex w-full max-w-prose items-center justify-between px-4 py-2"
  >
    <div class="flex gap-2">
      <RoundButton
        icon="menu"
        ariaExpanded={currentMenu === 'main'}
        ariaControls="main-menu"
        ariaLabel={currentMenu === 'main' ? 'Hide main menu' : 'Show main menu'}
        filled={currentMenu === 'main'}
        onclick={() =>
          currentMenu === 'main' ? (currentMenu = '') : (currentMenu = 'main')}
      />
      {#if admin}
        <RoundButton
          icon="home"
          ariaLabel="Admin home"
          onclick={async () => await goto('/admin')}
        />
      {/if}
    </div>
    <p class="uppercase"><strong>{formattedDate}</strong></p>
    <RoundButton
      icon="person"
      ariaExpanded={currentMenu === 'account'}
      ariaControls="account-menu"
      ariaLabel={currentMenu === 'account'
        ? 'Hide account menu'
        : 'Show account menu'}
      filled={currentMenu === 'account'}
      onclick={() =>
        currentMenu === 'account'
          ? (currentMenu = '')
          : (currentMenu = 'account')}
    />
  </div>
  {#if currentMenu === 'main'}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      id="main-menu"
      class="m-auto flex w-full max-w-prose flex-col gap-2 p-4"
      onclick={() => {
        currentMenu = '';
      }}
      in:slide
      out:slide
    >
      <h2 class="text-xl font-bold">Main menu</h2>
      <a href="/" class="flex items-center gap-1 font-bold">
        <span class="material-symbols-outlined" aria-hidden="true">home</span>
        <span class="underline">Home</span>
      </a>
      <p class="flex items-center gap-1 font-bold">
        <span class="material-symbols-outlined" aria-hidden="true"
          >query_stats</span
        >
        <span class="mr-1">Research</span>
        <Pill text="Coming soon" />
      </p>
      <a href="/mission-statement" class="flex items-center gap-1 font-bold">
        <span class="material-symbols-outlined" aria-hidden="true"
          >receipt_long</span
        >
        <span class="underline">Mission</span>
      </a>
      <a
        href="mailto:thetryingtimes@proton.me?subject=Letter+to+the+editor"
        class="flex items-center gap-1 font-bold"
      >
        <span class="material-symbols-outlined" aria-hidden="true"
          >mail_lock</span
        >
        <span class="underline">Contact</span>
      </a>
    </div>
  {/if}
  {#if currentMenu === 'account'}
    <div
      id="account-menu"
      class="m-auto flex w-full max-w-prose flex-col gap-2 p-4"
      in:slide
      out:slide
    >
      <h2 class="text-xl font-bold">Account</h2>
      {#if page.data.user_id}
        <a
          href="#logout"
          class="flex items-center gap-1 font-bold"
          onclick={async (e) => {
            e.preventDefault();

            try {
              const req = await fetch(LogoutRequestEndpoint, {
                method: 'POST'
              });
            } catch (e) {}

            await invalidateAll();
          }}
        >
          <span class="material-symbols-outlined" aria-hidden="true"
            >logout</span
          >
          <span class="underline">Sign out</span>
        </a>
      {:else}
        <a
          href="#sign-in"
          class="flex items-center gap-1 font-bold"
          onclick={(e) => {
            e.preventDefault();
            registerDialog.showModal();
          }}
        >
          <span class="material-symbols-outlined" aria-hidden="true"
            >person</span
          >
          <span class="underline">Sign in or register</span>
        </a>
      {/if}
    </div>
  {/if}
</nav>

<IdentityDialog
  bind:dialog={registerDialog}
  mode="account"
  oncomplete={async (success) => {
    await invalidateAll();
    registerDialog.close();
  }}
/>

<style>
  div[id] a {
    max-width: max-content;
  }

  div[id] .material-symbols-outlined {
    font-size: 18px;
  }
</style>
