<script lang="ts">
  let {
    href,
    label,
    onclick
  }: { href: string; label: string; onclick?: (e: MouseEvent) => void } =
    $props();
</script>

<a
  {href}
  {onclick}
  class="border-ttt hover:bg-ttt/10 font-cond hover:outline-ttt max-w-fit rounded-3xl border px-4 py-2 uppercase hover:outline"
>
  {label}
</a>
