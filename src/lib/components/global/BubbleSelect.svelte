<script lang="ts">
  import { nanoid } from 'nanoid';
  import { bubbleClass } from './bubbleClass';

  let {
    label,
    labelledBy,
    selected = $bindable(),
    options,
    onchange
  }: {
    label: string;
    labelledBy: string;
    selected: string;
    options: { key: string; label: string }[];
    onchange: (value: string) => void;
  } = $props();

  const id = nanoid();
</script>

<div class="{bubbleClass} relative pl-2">
  <div class="flex items-center gap-1">
    <span class="material-symbols-outlined" aria-hidden="true">unfold_more</span
    >
    {options.filter((f) => f.key === selected)[0].label}
  </div>
  <label for={id} class="sr-only absolute">{label}</label>
  <select
    {id}
    aria-labelledby={labelledBy}
    bind:value={selected}
    onchange={() => {
      onchange(selected);
    }}
    class="absolute top-0 right-0 bottom-0 left-0 opacity-0"
  >
    {#each options as option (option.key)}
      <option value={option.key}>{option.label}</option>
    {/each}
  </select>
</div>

<style>
  .material-symbols-outlined {
    font-size: 22px;
  }
</style>
