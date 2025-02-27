<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    KnowledgeRequestEndpoint,
    type KnowledgeRequestProps,
    KnowledgeResponseParser,
    type KnowledgeResponseType
  } from '$lib/api/admin/knowledge';
  import { ApiClient } from '$lib/api/ApiClient';
  import {
    ArticleSaveEndpoint,
    type ArticleSaveRequestProps,
    ArticleSaveResponseParser,
    type ArticleDraft,
    type ArticleSaveResponse
  } from '$lib/api/articles/article';
  import AdminAddSectionSelect from '$lib/components/admin/AdminAddSectionSelect.svelte';
  import AdminButton from '$lib/components/admin/AdminButton.svelte';
  import AdminCategorySelect from '$lib/components/admin/AdminCategorySelect.svelte';
  import AdminCheckbox from '$lib/components/admin/AdminCheckbox.svelte';
  import AdminDatetime from '$lib/components/admin/AdminDate.svelte';
  import AdminFileAttachment from '$lib/components/admin/AdminFileAttachment.svelte';
  import AdminReadonly from '$lib/components/admin/AdminReadonly.svelte';
  import AdminTextarea from '$lib/components/admin/AdminTextarea.svelte';
  import { getTodaysDate } from '$lib/utils/date';
  import { filesToBase64 } from '$lib/utils/file';
  import { nanoid } from 'nanoid';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let draft = $state<ArticleDraft>(
    data.article || {
      external_id: nanoid(12),
      published_at: getTodaysDate(),
      published: false,
      category_id: null,
      voting_enabled: false,
      pinned: false,

      knowledge: '',
      user_message: '',

      content: {
        title: '',
        blurb: '',
        sections: [{ type: 'section', content: '' }]
      }
    }
  );

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
  <title>{draft.content.title || 'New Article'} | The Trying Times</title>
</svelte:head>

<div class="flex flex-wrap justify-center gap-8 py-8">
  <header
    class="m-auto flex w-full max-w-prose items-center px-4 xl:max-w-[1200px]"
  >
    <h1 class="grow font-serif text-3xl">
      {draft.content.title || 'New Article'}
    </h1>
    <AdminButton
      label="Save"
      onclick={async () => {
        const res = await ApiClient.post<
          ArticleSaveRequestProps,
          ArticleSaveResponse
        >(ArticleSaveEndpoint, draft, ArticleSaveResponseParser);

        if (res && res.success) await goto('/admin');
      }}
    />
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
    <div class="flex items-center justify-between">
      <h2 class="font-serif text-xl">Knowledge</h2>
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
          >(
            KnowledgeRequestEndpoint,
            { files, user_message: draft.user_message },
            KnowledgeResponseParser
          );

          knowledgeLoading = false;

          if (res && res.success) {
            draft.knowledge = res.markdown;
          }
        }}
      />
    </div>
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
    <div>
      <AdminTextarea
        label="Additional instructions"
        bind:value={draft.user_message}
      />
    </div>
    <div class="prose">
      <pre
        class="min-h-56 whitespace-pre-wrap"
        bind:innerText={draft.knowledge}
        contenteditable></pre>
    </div>
  </section>

  <section
    class="flex w-full max-w-prose grow flex-col gap-4 rounded-lg border-2 border-gray-400 p-4"
  >
    <h2 class="font-serif text-xl">Article</h2>
    <AdminTextarea label="Title" serif bind:value={draft.content.title} />
    <AdminTextarea label="Blurb" bind:value={draft.content.blurb} />
    <div class="flex flex-wrap gap-4">
      <AdminCheckbox label="Published" bind:checked={draft.published} />
      <AdminCheckbox
        label="Voting Enabled"
        bind:checked={draft.voting_enabled}
      />
      <AdminCheckbox label="Pinned" bind:checked={draft.pinned} />
    </div>
    <div class="flex flex-wrap gap-4">
      <AdminCategorySelect bind:value={draft.category_id} />
      <AdminDatetime label="Pulbished at" bind:value={draft.published_at} />
      <AdminReadonly
        label="External ID"
        bind:value={draft.external_id}
        href="https://thetryingtimes.com/{draft.external_id}"
      />
    </div>
    {#each draft.content.sections as section, index}
      <AdminTextarea
        lg
        label="Section {index + 1}"
        bind:value={section.content}
      />
    {/each}
    <AdminAddSectionSelect bind:sections={draft.content.sections} />
  </section>
</div>
