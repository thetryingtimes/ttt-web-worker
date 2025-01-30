<script lang="ts">
  import { goto } from '$app/navigation';
  import AdminButton from '$lib/components/admin/AdminButton.svelte';
  import Header from '$lib/components/global/Header.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Articles | The Trying Times</title>
</svelte:head>

<Header />

<section class="m-auto flex max-w-prose flex-col gap-8">
  <header class="flex items-center">
    <h1 class="grow font-serif text-3xl">Articles</h1>
    <AdminButton
      label="New"
      onclick={async () => await goto('/admin/article')}
    />
  </header>
  {#if data.success && data.articles}
    <div class="flex flex-col gap-2">
      {#each data.articles as article}
        <div class="flex items-center border-b border-b-gray-200 py-2">
          <h2 class="flex grow flex-col">
            <span
              class="font-cond text-sm uppercase"
              class:text-gray-400={!article.published}
              >{article.published ? 'Published' : 'Draft'}</span
            >
            <span class="font-serif text-2xl">
              {article.content.title}
            </span>
          </h2>
          <AdminButton
            label="Edit"
            onclick={async () =>
              await goto(`/admin/article?external_id=${article.external_id}`)}
          />
        </div>
      {/each}
    </div>
  {:else}
    <h2>Error loading articles</h2>
  {/if}
</section>
