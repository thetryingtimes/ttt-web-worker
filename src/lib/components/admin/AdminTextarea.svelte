<script lang="ts">
  import { nanoid } from 'nanoid';

  let { label, value = $bindable(), serif = false, lg = false } = $props();

  const id = nanoid();
</script>

<div class="flex flex-col">
  <label for={id} class="font-cond uppercase">{label}</label>
  <textarea
    {id}
    bind:value
    rows={lg ? 9 : 3}
    class="ring-2 ring-gray-200"
    class:font-serif={serif}
    class:text-2xl={serif}
  ></textarea>
</div>
