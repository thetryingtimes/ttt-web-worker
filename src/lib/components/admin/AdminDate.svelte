<script lang="ts">
  import { nanoid } from 'nanoid';

  let { label, value = $bindable() } = $props();

  const id = nanoid();
</script>

<div class="flex grow flex-col">
  <label for={id} class="font-cond uppercase">{label}</label>
  <input type="date" {id} bind:value class="ring-2 ring-gray-200" />
</div>
