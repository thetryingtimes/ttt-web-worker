<script lang="ts">
  import { bubbleClass } from './bubbleClass';

  let {
    href,
    label,
    onclick
  }: { href: string; label: string; onclick?: (e: MouseEvent) => void } =
    $props();
</script>

<a {href} {onclick} class={bubbleClass}>
  {label}
</a>
