<script lang="ts">
  import { goto } from '$app/navigation';
  import AdminButton from '$lib/components/admin/AdminButton.svelte';
</script>

<svelte:head>
  <title>Articles | The Trying Times</title>
</svelte:head>

<section class="m-auto max-w-prose">
  <header class="flex items-center">
    <h1 class="grow font-serif text-2xl">Articles</h1>
    <AdminButton label="New" onclick={() => goto('/admin/article')} />
  </header>
</section>
