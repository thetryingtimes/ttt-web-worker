<script lang="ts">
  import { slide } from 'svelte/transition';
  import ActionButton from '../global/ActionButton.svelte';
  import Dialog from '../global/Dialog.svelte';
  import { ApiClient } from '$lib/api/ApiClient';
  import {
    LoginRequestEndpoint,
    type LoginRequestProps,
    LoginResponseParser,
    type LoginResponseType
  } from '$lib/api/account/auth/login';
  import {
    VerifyRequestEndpoint,
    type VerifyRequestProps,
    VerifyResponseParser,
    type VerifyResponseType
  } from '$lib/api/account/auth/verify';
  import { invalidateAll } from '$app/navigation';

  let {
    dialog = $bindable(),
    mode = 'account',
    oncomplete
  }: {
    dialog: HTMLDialogElement;
    mode?: 'account' | 'verify';
    oncomplete: (success: boolean) => void;
  } = $props();

  let step: 'phone' | 'challenge' | 'blocked' = $state('phone');
  let header = $derived(
    mode === 'account' ? `Sign in or register` : `Verify your identity`
  );
  let headerLabel = $derived(
    step === 'phone' ? `(Step 1/2)` : step === 'challenge' ? '(Step 2/2)' : ''
  );

  let phone: string = $state('');
  let phoneValid: boolean = $state(false);
  let phoneLoading: boolean = $state(false);
  let phoneError: boolean = $state(false);
  let code: string = $state('');
  let codeValid: boolean = $state(false);
  let codeLoading: boolean = $state(false);
  let codeError: boolean = $state(false);

  let method_id: string;

  const completeAndReset = async (status: boolean) => {
    await invalidateAll();
    dialog.close();
    oncomplete(status);

    phone = '';
    phoneValid = false;
    phoneLoading = false;
    code = '';
    codeValid = false;
    codeLoading = false;
  };
</script>

{#snippet phoneActions()}
  <p class="w-full text-center text-sm">
    By continuing, you agree to the <a
      class="underline"
      href="/terms-of-use"
      target="_blank">Terms of Use</a
    >
    and
    <a class="underline" href="/privacy-policy" target="_blank"
      >Privacy Policy</a
    >. Msg rates may apply.
  </p>
  <ActionButton
    label="Next: Text Verification Code"
    disabled={phoneValid === false || phone === ''}
    loading={phoneLoading}
    onclick={async () => {
      phoneError = false;
      phoneLoading = true;

      const res = await ApiClient.post<LoginRequestProps, LoginResponseType>(
        LoginRequestEndpoint,
        { phone_number: phone },
        LoginResponseParser
      );

      phoneLoading = false;

      if (res && res.success && res.method_id) {
        method_id = res.method_id;
        step = 'challenge';
      } else {
        phoneError = true;
      }
    }}
  />
{/snippet}

{#snippet challengeActions()}
  <ActionButton
    label="Next: Verify and continue"
    disabled={codeValid === false || code === ''}
    loading={codeLoading}
    onclick={async () => {
      codeError = false;
      codeLoading = true;

      const res = await ApiClient.post<VerifyRequestProps, VerifyResponseType>(
        VerifyRequestEndpoint,
        {
          method_id,
          code
        },
        VerifyResponseParser
      );

      if (res && res.success) {
        method_id = '';
        await completeAndReset(true);
      } else {
        codeError = true;
        codeLoading = false;
      }
    }}
  />
{/snippet}

{#snippet blockedActions()}
  <ActionButton
    label="Done"
    onclick={async () => {
      await completeAndReset(false);
    }}
  />
{/snippet}

<Dialog
  bind:dialog
  actions={step === 'phone'
    ? phoneActions
    : step === 'challenge'
      ? challengeActions
      : blockedActions}
  header={`${header} <span class="text-white/50">${headerLabel}</span>`}
>
  {#if step !== 'blocked'}
    <p>
      <strong>Your phone number is your voter ID.</strong> To keep voting fair, we'll
      text you a verification code.
    </p>
  {:else}
    <p><strong>You have been blocked.</strong></p>
  {/if}
  {#if step === 'phone'}
    <fieldset class="flex flex-col gap-2" out:slide>
      <label for="phone-field" id="phone-label" class="font-bold"
        >Enter your phone number:</label
      >
      <div
        class="has-invalid:ring-ttt-red flex items-center gap-1 border-2 border-white p-1 px-1 focus-within:ring-2 focus-within:ring-white has-invalid:ring-2"
      >
        <span class="material-symbols-outlined" aria-hidden="true">call</span>
        <input
          id="phone-field"
          name="phone"
          type="text"
          aria-labelledby="phone-label phone-hint"
          class="grow p-1 placeholder:text-white/80 focus:ring-0 focus:outline-0"
          placeholder="(555) 555-5555"
          autocomplete="tel"
          inputmode="tel"
          pattern="\+1(\d){'{10}'}"
          bind:value={phone}
          oninput={(e) => {
            if (phone === '') return;
            phone = `+1` + phone.replace(/^\+1/, '').replace(/([^\d])/g, '');
            phoneValid = (e.target as HTMLInputElement).reportValidity();
          }}
        />
      </div>
      <span id="phone-hint">We will never sell your number or spam you.</span>
    </fieldset>
    {#if phoneError}
      <p>Something went wrong, please try again.</p>
    {/if}
  {/if}
  {#if step === 'challenge'}
    <fieldset class="flex flex-col gap-2" in:slide>
      <label for="code-field" id="code-label" class="font-bold"
        >Enter the verification code we just texted you:</label
      >
      <div
        class="has-invalid:ring-ttt-red flex items-center gap-1 border-2 border-white p-1 px-1 focus-within:ring-2 focus-within:ring-white has-invalid:ring-2"
      >
        <span class="material-symbols-outlined" aria-hidden="true">lock</span>
        <input
          id="code-field"
          type="text"
          aria-labelledby="code-label code-hint"
          class="grow p-1 placeholder:text-white/80 focus:ring-0 focus:outline-0"
          placeholder="123456"
          autocomplete="one-time-code"
          inputmode="numeric"
          pattern="(\d){'{6}'}"
          bind:value={code}
          oninput={(e) => {
            code = code.replace(/([^\d])/g, '');
            codeValid = (e.target as HTMLInputElement).reportValidity();
          }}
        />
      </div>
      <span id="code-hint"
        >Didn't get a text? <a
          href="#start-over"
          class="underline"
          onclick={(e) => {
            e.preventDefault();

            phone = '';
            code = '';
            step = 'phone';
          }}>Start over.</a
        ></span
      >
    </fieldset>
    {#if codeError}
      <p>Something went wrong, please try again.</p>
    {/if}
  {/if}
</Dialog>
