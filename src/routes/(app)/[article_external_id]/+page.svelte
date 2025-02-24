<script lang="ts">
  import Article from '$lib/components/articles/Article.svelte';
  import ArticleHeader from '$lib/components/articles/ArticleHeader.svelte';
  import ArticleNav from '$lib/components/articles/ArticleNav.svelte';
  import Impact from '$lib/components/global/Impact.svelte';
  import showdown from 'showdown';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.cached_article.article.content.title} | The Trying Times</title>
  <meta
    property="og:title"
    content="{data.cached_article.article.content.title} | The Trying Times"
  />
  <meta
    property="og:description"
    content={data.cached_article.article.content.blurb}
  />
</svelte:head>

<Impact />

<div class="m-auto mb-8 flex max-w-prose flex-col px-4 pt-8">
  <ArticleHeader bind:cached_article={data.cached_article} />
  <h1 class="my-2 font-serif text-2xl text-pretty md:text-3xl">
    {data.cached_article.article.content.title}
  </h1>
  <p class="font-serif text-lg text-pretty md:text-xl">
    {data.cached_article.article.content.blurb}
  </p>
</div>

<div class="flex flex-col gap-8">
  {#each data.cached_article.article.content.sections as section, index (section.content)}
    {#if section.type === 'section'}
      <Article>
        {@html new showdown.Converter().makeHtml(section.content)}
      </Article>
    {/if}
    {#if index % 3 === 0}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8548253373322481"
        crossorigin="anonymous"
      ></script>
      <ins
        class="adsbygoogle"
        style="display:block; text-align:center;"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8548253373322481"
        data-ad-slot="6454568024"
      ></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    {/if}
  {/each}
</div>

<div class="border-t-ttt sticky bottom-0 w-screen border-t bg-[#E5F3FF]">
  <div class="m-auto max-w-prose px-4 py-4">
    <ArticleNav bind:cached_article={data.cached_article} />
  </div>
</div>
