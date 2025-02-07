<script lang="ts">
  import type { CachedArticle } from '$lib/api/kv/article';
  import { millify } from 'millify';
  import { nanoid } from 'nanoid';

  let {
    value = $bindable(),
    cached_article
  }: { value: string; cached_article: CachedArticle } = $props();

  let total_support = $derived(millify(cached_article.votes.support));
  let total_oppose = $derived(millify(cached_article.votes.oppose));

  const describedById = nanoid();
  const name = nanoid();
  const supportId = nanoid();
  const opposeId = nanoid();
</script>

<div class="flex flex-col gap-2">
  <p id={describedById} class="font-bold">How do you vote?</p>
  <div class="flex gap-2">
    <label
      class="relative flex grow items-center gap-1 border-2 border-transparent p-2 focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-white has-[input:checked]:border-white"
    >
      <input
        type="radio"
        {name}
        bind:group={value}
        value="support"
        class="absolute opacity-0"
        aria-labelledby={supportId}
        aria-describedby={describedById}
      />
      <span class="material-symbols-outlined" aria-hidden="true">
        {value === 'support'
          ? 'radio_button_checked'
          : 'radio_button_unchecked'}
      </span>
      <span class="font-bold" id={supportId}
        >SUPPORT
        <span class="font-normal text-white/80"> {total_support}</span>
      </span>
    </label>
    <label
      class="relative flex grow items-center gap-1 border-2 border-transparent p-2 focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-white has-[input:checked]:border-white"
    >
      <input
        type="radio"
        {name}
        bind:group={value}
        value="oppose"
        class="absolute opacity-0"
        aria-labelledby={opposeId}
        aria-describedby={describedById}
      />
      <span class="material-symbols-outlined" aria-hidden="true">
        {value === 'oppose' ? 'radio_button_checked' : 'radio_button_unchecked'}
      </span>
      <span class="font-bold" id={opposeId}
        >OPPOSE
        <span class="font-normal text-white/80"> {total_oppose}</span>
      </span>
    </label>
  </div>
</div>
