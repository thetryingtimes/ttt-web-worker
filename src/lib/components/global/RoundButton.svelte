<script lang="ts">
  let { icon, filled = false } = $props<{ icon: string; filled?: boolean }>();
</script>

<button
  class="flex h-10 w-10 items-center justify-center rounded-full border border-black"
>
  <span class="material-symbols-outlined" class:filled>{icon}</span>
</button>
