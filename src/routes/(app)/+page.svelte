<script lang="ts">
  import ArticlePreview from '$lib/components/articles/ArticlePreview.svelte';
  import Impact from '$lib/components/global/Impact.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let external_ids: { external_id: string }[] = $state(data.list || []);
</script>

<svelte:head>
  <title>Home | The Trying Times</title>
  <meta property="og:title" content="The Trying Times" />
  <meta property="og:description" content="Hold Congress Accountable." />
</svelte:head>

<Impact />

{#if data.success && data.list && data.list.length}
  <h1 class="sr-only">Articles:</h1>
  <div class="m-auto flex w-full max-w-prose flex-col gap-16 py-8">
    {#each external_ids as item}
      <ArticlePreview external_id={item.external_id} />
    {/each}
  </div>
{:else}
  <h1
    class="flex min-h-96 items-center justify-center text-center font-serif text-2xl text-gray-400"
  >
    No articles.
  </h1>
{/if}
