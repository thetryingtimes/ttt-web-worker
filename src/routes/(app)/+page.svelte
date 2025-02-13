<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { ARTICLE_CATEGORIES } from '$lib/api/articles/category';
  import { HOME_FILTERS } from '$lib/api/home/filters';
  import ArticlePreview from '$lib/components/articles/ArticlePreview.svelte';
  import BubbleLink from '$lib/components/global/BubbleLink.svelte';
  import BubbleSelect from '$lib/components/global/BubbleSelect.svelte';
  import Impact from '$lib/components/global/Impact.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let { success, filteredBy, nextOffset } = $derived({
    success: data.success,
    filteredBy: data.filteredBy,
    nextOffset: data.nextOffset
  });
  let external_ids = $derived(data.list || []);
</script>

<svelte:head>
  <title>Home | The Trying Times</title>
  <meta property="og:title" content="The Trying Times" />
  <meta property="og:description" content="Hold Congress Accountable." />
</svelte:head>

<Impact />

{#if success && external_ids.length && filteredBy}
  <h1 class="sr-only">Articles:</h1>
  <div class="m-auto flex max-w-prose items-center gap-4 px-4 py-8">
    <span class="sr-only" id="filter-by">Search/filter articles by</span>
    <BubbleSelect
      label="Sort:"
      labelledBy="filter-by"
      selected={filteredBy}
      options={HOME_FILTERS}
      onchange={async (newFilter) => {
        const params = page.url.searchParams;
        params.set('filter', newFilter);

        await goto(`/?${params.toString()}`, { invalidateAll: true });
      }}
    />
    <BubbleSelect
      label="Category:"
      labelledBy="filter-by"
      selected="all"
      options={[
        { key: 'all', label: 'All' },
        ...ARTICLE_CATEGORIES.map((c) => {
          return { key: c.id, label: c.name };
        })
      ]}
      onchange={async (newCategory) => {
        const params = page.url.searchParams;
        if (newCategory === 'all') params.delete('category');
        else params.set('category', newCategory);

        await goto(`/?${params.toString()}`, { invalidateAll: true });
      }}
    />
  </div>
  <div class="m-auto flex w-full max-w-prose flex-col gap-16 pb-8">
    {#each external_ids as item, index (item.external_id)}
      <ArticlePreview external_id={item.external_id} />
      {#if index % 3 === 0 && index < external_ids.length - 1}
        <div class="inventory-container"></div>
      {/if}
    {/each}
    {#if nextOffset}
      <div class="-mt-6 flex items-center justify-center gap-4">
        {#if nextOffset && nextOffset > 10}
          <BubbleLink
            href="/?offset={nextOffset - 20}&filter={filteredBy}"
            label="Prev page"
            onclick={async (e) => {
              e.preventDefault();
              const params = page.url.searchParams;
              params.set('offset', (nextOffset - 20).toString());

              await goto(`/?${params.toString()}`, { invalidateAll: true });
            }}
          />
          <span class="font-cond uppercase">
            Page {Math.floor(nextOffset / 10)}
          </span>
        {/if}
        {#if external_ids.length === 10}
          <BubbleLink
            href="/?offset={nextOffset}&filter={filteredBy}"
            label="Next page"
            onclick={async (e) => {
              e.preventDefault();
              const params = page.url.searchParams;
              params.set('offset', nextOffset.toString());

              await goto(`/?${params.toString()}`, { invalidateAll: true });
            }}
          />
        {/if}
      </div>
    {/if}
  </div>
{:else}
  <h1
    class="flex min-h-96 items-center justify-center text-center font-serif text-2xl text-gray-400"
  >
    No articles.
  </h1>
{/if}
