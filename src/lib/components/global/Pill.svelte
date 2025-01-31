<script lang="ts">
  import type { ArticleCategory } from '$lib/api/articles/category';

  let {
    text,
    theme = 'blue'
  }: {
    text: string;
    theme?: ArticleCategory['theme'];
  } = $props();
</script>

<p
  class="{theme === 'blue' && 'border-ttt/80 bg-ttt/10'} {theme === 'green' &&
    'border-ttt-green/80 bg-ttt-green/10'} {theme === 'red' &&
    'border-ttt-red/80 bg-ttt-red/10'} font-cond max-w-fit rounded-sm border px-2 py-1.5 text-sm leading-none uppercase"
>
  {text}
</p>
