<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    inventory_eligible = false
  }: { children: Snippet; inventory_eligible?: boolean } = $props();
</script>

<article
  class="prose prose-headings:font-serif prose-headings:font-light prose-headings:mb-0 m-auto max-w-prose px-4 pt-4 pb-8"
  data-inventory-after={inventory_eligible || undefined}
>
  {@render children()}
</article>
