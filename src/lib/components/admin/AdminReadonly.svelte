<script lang="ts">
  import { nanoid } from 'nanoid';

  let { label, value = $bindable() } = $props();
  const id = nanoid();
</script>

<div class="flex grow flex-col">
  <label for={id} class="font-cond uppercase">{label}</label>
  <input {id} type="text" readonly {value} />
</div>
