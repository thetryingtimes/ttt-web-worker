<script lang="ts">
  let {
    label,
    icon,
    onclick = $bindable()
  } = $props<{ label: string; icon?: string; onclick: Function }>();
</script>

<button
  {onclick}
  class="bg-ttt flex grow items-center justify-center gap-1 border-[5px] border-white px-4 py-4 text-xl font-bold text-white"
>
  {#if icon}<span class="material-symbols-outlined text-lg">{icon}</span>{/if}
  {label}
</button>
