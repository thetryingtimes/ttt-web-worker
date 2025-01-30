<script lang="ts">
  import type { ArticleSection } from '$lib/api/articles/article';
  import AdminButton from './AdminButton.svelte';

  let { sections = $bindable<ArticleSection[]>() } = $props<{
    sections: ArticleSection[];
  }>();
</script>

<div>
  <AdminButton
    label="Add section"
    onclick={() => {
      (sections as ArticleSection[]) = [
        ...sections,
        { type: 'section', content: '' }
      ];
    }}
  />
</div>
