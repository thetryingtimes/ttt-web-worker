<script lang="ts">
  import { ARTICLE_CATEGORIES } from '$lib/api/articles/category';
  import { nanoid } from 'nanoid';

  let { value = $bindable() } = $props();

  const id = nanoid();
</script>

<div class="flex grow flex-col">
  <label for={id} class="font-cond uppercase">Category</label>
  <select class="h-6 ring-2 ring-gray-200" bind:value>
    <option></option>
    {#each ARTICLE_CATEGORIES as category}
      <option value={category.id}>{category.name}</option>
    {/each}
  </select>
</div>
