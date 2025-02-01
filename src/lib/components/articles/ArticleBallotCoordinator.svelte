<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import type { CachedArticle } from '$lib/api/kv/article';
  import IdentityDialog from '$lib/components/account/IdentityDialog.svelte';
  import BallotDialog from '../ballot/BallotDialog.svelte';

  let initialSelection: 'support' | 'oppose' = $state('support');
  let { cached_article = $bindable() }: { cached_article: CachedArticle } =
    $props();

  export const startBallot = (which: 'support' | 'oppose') => {
    initialSelection = which;

    if (page.data.user_id) {
      voteDialog.showModal();
    } else {
      identityDialog.showModal();
    }
  };

  const identityComplete = (success: boolean) => {
    if (success && page.data.user_id) {
      voteDialog.showModal();
    }
  };

  const ballotComplete = async (success: boolean) => {
    if (success) await invalidateAll();
  };

  // svelte-ignore non_reactive_update
  let identityDialog: HTMLDialogElement;
  // svelte-ignore non_reactive_update
  let voteDialog: HTMLDialogElement;
</script>

<IdentityDialog
  mode="verify"
  bind:dialog={identityDialog}
  oncomplete={identityComplete}
/>

<BallotDialog
  selected={initialSelection}
  bind:cached_article
  bind:dialog={voteDialog}
  oncomplete={ballotComplete}
/>
