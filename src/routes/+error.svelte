<script lang="ts">
  import Footer from '$lib/components/global/Footer.svelte';
  import Header from '$lib/components/global/Header.svelte';
  import Nav from '$lib/components/global/Nav.svelte';
  import '../app.css';
</script>

<svelte:head>
  <title>Page not found | The Trying Times</title>
</svelte:head>

<Nav />
<Header />
<main>
  <section
    class="m-auto flex h-80 max-w-prose flex-col items-center justify-center gap-2 px-4"
  >
    <h2 class="text-center font-serif text-2xl text-balance">
      Page not found. <span class="text-gray-500">That's all we know.</span>
    </h2>
    <p><a class="font-bold underline" href="/">Homepage</a></p>
  </section>
</main>
<Footer />
