import {
  HOME_FILTERS,
  type HomeFilter,
  type HomeFilterKey
} from '$lib/api/home/filters';
import { SupabaseClient } from '$lib/server/utils/supabase';
import type { Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ARTICLE_CATEGORIES } from '$lib/api/articles/category';

const setFilterCookie = (cookies: Cookies, key: HomeFilterKey) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);

  cookies.set('filter', key, {
    expires,
    httpOnly: true,
    path: '/'
  });
};

export const load: PageServerLoad = async ({ platform, url, cookies }) => {
  if (!platform) return { success: false };

  const offsetParam = url.searchParams.get('offset');
  const filterSearchParam: HomeFilter | undefined = HOME_FILTERS.filter(
    (f) => f.key === url.searchParams.get('sort')
  )[0];
  const filterCookie = cookies.get('filter');
  const categorySearchParam: string | undefined =
    ARTICLE_CATEGORIES.filter(
      (c) => c.id === url.searchParams.get('category')
    )[0]?.id || undefined;

  let appliedFilterKey: HomeFilterKey;

  if (filterSearchParam) {
    setFilterCookie(cookies, filterSearchParam.key);
    appliedFilterKey = filterSearchParam.key;
  } else if (filterCookie) {
    const validated = HOME_FILTERS.filter((f) => f.key === filterCookie)[0];

    if (validated) {
      appliedFilterKey = validated.key;
      setFilterCookie(cookies, appliedFilterKey);
    } else {
      appliedFilterKey = HOME_FILTERS[0].key;
      setFilterCookie(cookies, appliedFilterKey);
    }
  } else {
    appliedFilterKey = HOME_FILTERS[0].key;
    setFilterCookie(cookies, appliedFilterKey);
  }

  const supa = new SupabaseClient(platform);
  const { data } = await supa.publicGetHomepageExternalIds(
    appliedFilterKey,
    offsetParam ? Number(offsetParam) : 0,
    categorySearchParam
  );

  const pinned = await supa.publicGetHomepagePinnedIds();

  if (data) {
    return {
      success: true,
      list: data,
      pinned: pinned.data,
      filteredBy: appliedFilterKey,
      nextOffset: offsetParam ? Number(offsetParam) + 10 : 10
    };
  }

  return { success: false };
};
