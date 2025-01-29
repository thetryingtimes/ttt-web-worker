<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    dialog = $bindable(),
    children,
    actions
  } = $props<{
    dialog: HTMLDialogElement;
    children: Snippet;
    actions?: Snippet;
  }>();
</script>

<dialog
  bind:this={dialog}
  class="absolute top-0 left-0 h-dvh max-h-screen w-screen max-w-screen overflow-hidden bg-transparent backdrop:bg-black/65"
>
  <div
    class="bg-ttt absolute bottom-0 left-0 w-full rounded-tl-4xl rounded-tr-4xl text-white"
  >
    <article class="relative m-auto flex max-w-prose flex-col gap-8 py-8">
      <!-- svelte-ignore a11y_autofocus -->
      <button
        class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full"
        aria-label="Close dialog"
        autofocus
        onclick={() => {
          dialog.close();
        }}
      >
        <span class="material-symbols-outlined">cancel</span>
      </button>
      <div class="flex flex-col gap-6 px-8">
        {@render children()}
      </div>
      {#if actions}
        <div class="flex gap-4 px-4">
          {@render actions()}
        </div>
      {/if}
    </article>
  </div>
</dialog>

<style>
  dialog[open] > div {
    animation: fade-in 0.35s ease-out;
  }

  @starting-style {
    dialog > div {
      opacity: 0;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>
