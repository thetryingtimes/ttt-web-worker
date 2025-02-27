<script lang="ts">
  import { nanoid } from 'nanoid';

  let {
    label,
    value = $bindable(),
    href = undefined
  }: { label: string; value: string; href?: string } = $props();
  const id = nanoid();
</script>

<div class="flex grow flex-col" class:relative={href}>
  <label for={id} class="font-cond uppercase">{label}</label>
  <input {id} type="text" readonly {value} />
  {#if href}
    <a
      {href}
      target="_blank"
      class="absolute top-0 right-0 bottom-0 left-0 opacity-0">Preview</a
    >
  {/if}
</div>
