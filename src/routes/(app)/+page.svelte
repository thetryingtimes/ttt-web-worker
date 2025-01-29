<script lang="ts">
  import { TMP_ARTICLES } from '$lib/articles';
  import ArticleHomepagePreview from '$lib/components/articles/ArticleHomepagePreview.svelte';
  import Impact from '$lib/components/global/Impact.svelte';
</script>

<svelte:head>
  <title>Home | The Trying Times</title>
  <meta property="og:title" content="The Trying Times" />
  <meta
    property="og:description"
    content="Fight billionaires with news you can act on."
  />
</svelte:head>

<Impact />

<h1 class="sr-only">Articles:</h1>

{#each TMP_ARTICLES as article}
  <ArticleHomepagePreview {article} />
{/each}
