<script lang="ts">
  let {
    label,
    icon,
    disabled = false,
    loading = false,
    onclick = $bindable()
  }: {
    label: string;
    icon?: string;
    disabled?: boolean;
    loading?: boolean;
    onclick: (e: MouseEvent) => void;
  } = $props();
</script>

<button
  {onclick}
  disabled={disabled || loading}
  class="bg-ttt flex grow items-center justify-center gap-1 border-[5px] border-white px-4 py-4 text-xl font-bold text-white active:bg-white/10 disabled:opacity-50"
>
  {#if loading}
    <span
      aria-hidden="true"
      class="material-symbols-outlined animate-spin py-0.5 text-lg"
      >refresh</span
    >
  {:else}
    {#if icon}<span aria-hidden="true" class="material-symbols-outlined text-lg"
        >{icon}</span
      >{/if}
    {label}
  {/if}
</button>
