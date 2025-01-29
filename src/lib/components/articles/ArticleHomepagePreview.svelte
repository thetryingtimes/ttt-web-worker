<script lang="ts">
  import type { Article } from '$lib/articles';
  import Pill from '../global/Pill.svelte';

  interface Props {
    article: Article;
  }

  let { article }: Props = $props();

  let formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium'
  }).format(Date.parse(article.date_published));
</script>

<article class="m-auto flex max-w-prose flex-col gap-4 p-4 pb-8">
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2">
      <Pill text={article.category} />
      <span class="font-cond text-sm leading-none text-gray-500 uppercase"
        >{formattedDate}</span
      >
    </div>
    <h2>
      <a href={`/p/${article.id}`} class="font-serif text-2xl text-pretty"
        >{article.title}</a
      >
    </h2>
    <p>
      <a href={`/p/${article.id}`} class="text-pretty"
        >{article.blurb}
        <span class="text-cond text-ttt font-bold uppercase">&gt;&gt;</span></a
      >
    </p>
  </div>
  <nav class="flex items-center justify-between md:justify-start md:gap-4">
    <button class="font-cond flex items-center gap-1 uppercase">
      <span
        class="material-symbols-outlined filled text-ttt-green"
        aria-hidden="true">thumb_up</span
      >
      SUPPORT
      <span class="text-gray-500">15%</span>
    </button>
    <button class="font-cond flex items-center gap-1 uppercase">
      <span
        class="material-symbols-outlined filled text-ttt-red"
        aria-hidden="true">thumb_down</span
      >
      OPPOSE
      <span class="text-gray-500">85%</span>
    </button>
    <button class="font-cond flex items-center gap-1 uppercase">
      <span class="material-symbols-outlined filled" aria-hidden="true"
        >ios_share</span
      >
      SHARE
      <span class="text-gray-500">1.5K</span>
    </button>
  </nav>
</article>
