<script lang="ts">
  import Nav from '$lib/components/global/Nav.svelte';

  import '../../../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>The Trying Times | Admin</title>
</svelte:head>

<Nav admin />
<main>
  {@render children()}
</main>
