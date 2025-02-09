<script lang="ts">
  import { afterNavigate } from '$app/navigation';

  let { children } = $props();

  afterNavigate(() => {
    window.dispatchEvent(new Event('popstate'));
  });
</script>

{@render children()}
