<script lang="ts">
  import Footer from '$lib/components/global/Footer.svelte';
  import Header from '$lib/components/global/Header.svelte';
  import Nav from '$lib/components/global/Nav.svelte';

  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>The Trying Times</title>
</svelte:head>

<Nav />
<Header />
<main>
  {@render children()}
</main>
<Footer />
