<script lang="ts">
  import RoundButton from './RoundButton.svelte';

  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long'
  }).format(date);
</script>

<nav class="sticky border-b border-b-gray-400 bg-gray-100">
  <div class="m-auto flex max-w-prose items-center justify-between p-4">
    <span class="inline-block h-10 w-10"></span>
    <p class="uppercase"><strong>{formattedDate}</strong></p>
    <RoundButton icon="person" ariaLabel="Show account menu" />
  </div>
</nav>
