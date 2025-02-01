import { getArticleShareEndpoint } from '$lib/api/articles/share';

export const shareArticle = async (external_id: string) => {
  try {
    await navigator.share({
      url: `https://thetryingtimes.com/${external_id}`
    });

    const req = await fetch(getArticleShareEndpoint(external_id), {
      method: 'POST'
    });

    await req.json();
  } catch (e) {}
};
