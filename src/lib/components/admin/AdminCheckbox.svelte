<script lang="ts">
  import { nanoid } from 'nanoid';

  let { label, checked = $bindable() } = $props();

  const id = nanoid();
</script>

<div class="flex flex-col">
  <label for={id} class="font-cond relative flex items-center gap-2 uppercase">
    <span class="material-symbols-outlined" aria-hidden="true">
      {#if checked}check_box{/if}
      {#if !checked}check_box_outline_blank{/if}
    </span>
    <input type="checkbox" bind:checked class="absolute opacity-0" {id} />
    <span class:text-gray-400={!checked}>{label}</span>
  </label>
</div>
