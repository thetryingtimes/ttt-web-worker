<script lang="ts">
  import { quartOut } from 'svelte/easing';
  import { Tween } from 'svelte/motion';

  let { oncomplete }: { oncomplete: () => void } = $props();

  const tween = new Tween(0, { duration: 2250, easing: quartOut });

  let pressing = $state(false);
  let complete = $state(false);
  let label = $derived(
    pressing
      ? 'Keep pressing!'
      : complete
        ? 'Sending…'
        : 'Next: Cast your ballot'
  );

  const start = () => {
    if (complete) return;

    pressing = true;
    tween.set(100).then(() => {
      complete = true;
      pressing = false;
      oncomplete();
    });
  };

  const stop = () => {
    if (complete) return;

    pressing = false;
    tween.set(0);
  };
</script>

<button
  class="bg-ttt relative flex grow items-center justify-center gap-1 border-[5px] border-white px-4 py-4 text-xl font-bold text-white select-none"
  disabled={complete}
  onmousedown={start}
  onmouseup={stop}
  onmouseout={stop}
  onblur={stop}
  onkeydown={start}
  onkeyup={stop}
>
  {label}
  <div
    class="pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center gap-2 overflow-hidden bg-white p-4 text-xl text-nowrap text-black"
    role="presentation"
    style="clip-path: inset(0 {100 - tween.current}% 0 0);"
  >
    {#if complete}
      <span class="material-symbols-outlined animate-spin" aria-hidden="true"
        >refresh</span
      >
    {/if}
    {label}
  </div>
</button>
