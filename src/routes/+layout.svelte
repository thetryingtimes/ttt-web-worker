<script lang="ts">
  import Footer from '$lib/components/global/Footer.svelte';
  import Header from '$lib/components/global/Header.svelte';
  import Impact from '$lib/components/global/Impact.svelte';
  import Nav from '$lib/components/global/Nav.svelte';

  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>The Trying Times</title>
</svelte:head>

<Nav />
<Header />
<Impact />
{@render children()}
<Footer />
