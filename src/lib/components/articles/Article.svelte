<script lang="ts">
  let { children } = $props();
</script>

<article
  class="prose prose-headings:font-serif prose-headings:font-light prose-headings:mb-0 m-auto max-w-prose px-4 py-8"
>
  {@render children()}
</article>
