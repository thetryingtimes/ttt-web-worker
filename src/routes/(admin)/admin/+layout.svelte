<script lang="ts">
  import Footer from '$lib/components/global/Footer.svelte';
  import Nav from '$lib/components/global/Nav.svelte';

  import '../../../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>The Trying Times | Admin</title>
</svelte:head>

<Nav admin />
<main class="pb-8">
  {@render children()}
</main>
<Footer />
