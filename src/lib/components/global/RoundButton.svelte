<script lang="ts">
  let {
    icon,
    ariaLabel,
    filled = false
  } = $props<{ icon: string; ariaLabel: string; filled?: boolean }>();
</script>

<button
  aria-label={ariaLabel}
  class="flex h-10 w-10 items-center justify-center rounded-full border border-black"
>
  <span aria-hidden="true" class="material-symbols-outlined" class:filled
    >{icon}</span
  >
</button>
