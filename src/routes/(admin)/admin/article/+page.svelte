<script lang="ts">
  import {
    KnowledgeRequestEndpoint,
    type KnowledgeRequestProps,
    KnowledgeResponseParser,
    type KnowledgeResponseType
  } from '$lib/api/admin/knowledge';
  import { ApiClient } from '$lib/api/ApiClient';
  import AdminButton from '$lib/components/admin/AdminButton.svelte';
  import AdminCheckbox from '$lib/components/admin/AdminCheckbox.svelte';
  import AdminDatetime from '$lib/components/admin/AdminDate.svelte';
  import AdminFileAttachment from '$lib/components/admin/AdminFileAttachment.svelte';
  import AdminReadonly from '$lib/components/admin/AdminReadonly.svelte';
  import AdminTextarea from '$lib/components/admin/AdminTextarea.svelte';
  import Article from '$lib/components/articles/Article.svelte';
  import { getTodaysDate } from '$lib/utils/date';
  import { filesToBase64 } from '$lib/utils/file';
  import { nanoid } from 'nanoid';

  let article = $state({
    title: '',
    blurb: '',
    summary: '',
    impact: '',
    knowledge: '',

    external_id: nanoid(12),
    published: false,
    published_at: getTodaysDate()
  });

  let knowledgeLoading = $state(false);
  let dragging = $state(false);
  let droppedFiles = $state<File[]>([]);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      dragging = true;
    } else if (e.type === 'dragleave') {
      dragging = false;
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dragging = false;

    if (e.dataTransfer && e.dataTransfer.files.length) {
      droppedFiles = [...droppedFiles, ...Array.from(e.dataTransfer.files)];
    }
  };
</script>

<svelte:head>
  <title>New Article | The Trying Times</title>
</svelte:head>

<div class="flex flex-wrap justify-center gap-8">
  <header class="m-auto flex w-full max-w-prose items-center xl:max-w-[1200px]">
    <h1 class="grow font-serif text-3xl">{article.title || 'Article'}</h1>
    <AdminButton label="Save" onclick={() => {}} />
  </header>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <section
    class="flex w-full max-w-prose grow flex-col gap-4 rounded-lg border-2 border-gray-400 p-4 {dragging
      ? `border-ttt bg-ttt/10 border-dashed`
      : ``}"
    ondragenter={handleDrag}
    ondragover={handleDrag}
    ondragleave={handleDrag}
    ondrop={handleDrop}
  >
    <h2 class="font-serif text-xl">Knowledge</h2>
    <div class="flex flex-col gap-2">
      {#each droppedFiles as file, index}
        <AdminFileAttachment
          {file}
          {index}
          ondelete={(index) => {
            droppedFiles = droppedFiles.filter((_, i) => i !== index);
          }}
        />
      {/each}
    </div>
    {#if article.knowledge}
      <div class="prose"><pre>{article.knowledge}</pre></div>
    {/if}
    <div>
      <AdminButton
        label="Process"
        disabled={droppedFiles.length === 0 || knowledgeLoading}
        loading={knowledgeLoading}
        onclick={async () => {
          knowledgeLoading = true;

          const files = await filesToBase64(droppedFiles);

          const res = await ApiClient.post<
            KnowledgeRequestProps,
            KnowledgeResponseType
          >(KnowledgeRequestEndpoint, { files }, KnowledgeResponseParser);

          knowledgeLoading = false;

          if (res && res.success) {
            article.knowledge = res.markdown;
          }
        }}
      />
    </div>
  </section>

  <section
    class="flex w-full max-w-prose grow flex-col gap-4 rounded-lg border-2 border-gray-400 p-4"
  >
    <h2 class="font-serif text-xl">Article</h2>
    <AdminTextarea label="Title" serif bind:value={article.title} />
    <AdminCheckbox label="Published" bind:checked={article.published} />
    <div class="flex gap-4">
      <AdminDatetime label="Pulbished at" bind:value={article.published_at} />
      <AdminReadonly label="External ID" bind:value={article.external_id} />
    </div>
    <AdminTextarea label="Blurb" bind:value={article.blurb} />
    <AdminTextarea label="Summary" bind:value={article.summary} />
    <AdminTextarea label="Impact" bind:value={article.impact} />
  </section>
</div>
