<script lang="ts">
  let {
    label,
    icon,
    disabled = false,
    loading = false,
    onclick
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
  class="bg-ttt font-cond flex items-center justify-center px-4 py-2 font-bold text-white uppercase disabled:opacity-50"
  {disabled}
>
  {#if loading}
    <span class="material-symbols-outlined animate-spin">refresh</span>
  {:else}
    {#if icon}<span class="material-symbols-outlined" aria-hidden="true"
        >{icon}</span
      >{/if}
    {label}
  {/if}
</button>
