<script lang="ts">
  let {
    text
  }: {
    text: string;
  } = $props();
</script>

<p
  class="border-ttt/80 bg-ttt/10 font-cond max-w-fit rounded-sm border px-2 py-1.5 text-sm leading-none uppercase"
>
  {text}
</p>
