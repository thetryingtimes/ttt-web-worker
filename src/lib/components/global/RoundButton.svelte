<script lang="ts">
  let {
    icon,
    ariaLabel,
    ariaExpanded,
    ariaControls,
    filled = false,
    onclick
  }: {
    icon: string;
    ariaLabel: string;
    ariaExpanded?: boolean;
    ariaControls?: string;
    filled?: boolean;
    onclick?: (e: MouseEvent) => void;
  } = $props();
</script>

<button
  aria-label={ariaLabel}
  aria-expanded={ariaExpanded}
  aria-controls={ariaControls}
  {onclick}
  class="flex h-10 w-10 items-center justify-center rounded-full border border-black"
  class:bg-gray-200={filled}
  class:border-2={filled}
>
  <span aria-hidden="true" class="material-symbols-outlined" class:filled
    >{icon}</span
  >
</button>
