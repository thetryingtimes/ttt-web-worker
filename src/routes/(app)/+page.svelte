<script lang="ts">
  import Impact from '$lib/components/global/Impact.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
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

{#if data.success}
  <h1 class="sr-only">Articles:</h1>
{:else}
  <h1
    class="flex min-h-96 items-center justify-center text-center font-serif text-2xl text-gray-400"
  >
    Down for maintenance.
  </h1>
{/if}
