<script lang="ts">
  let { children } = $props();
</script>

<article
  class="prose prose-headings:font-serif prose-headings:font-light prose-headings:mb-0 m-auto w-full max-w-prose px-4 pt-4 pb-8 text-pretty"
>
  {@render children()}
</article>
