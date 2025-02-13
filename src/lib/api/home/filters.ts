export type HomeFilterKey = 'popular' | 'new';
export type HomeFilter = { key: HomeFilterKey; label: string };

export const HOME_FILTERS: HomeFilter[] = [
  { key: 'popular', label: 'Popular' },
  { key: 'new', label: 'New' }
] as const;
