export type ArticleCategory = {
  id: string;
  name: string;
  theme: 'blue' | 'red' | 'green';
};

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  {
    id: 'house',
    name: 'House',
    theme: 'blue'
  },
  {
    id: 'senate',
    name: 'Senate',
    theme: 'blue'
  },
  {
    id: 'eo',
    name: 'Executive Order',
    theme: 'blue'
  },
  {
    id: 'state',
    name: 'State',
    theme: 'blue'
  },
  {
    id: 'editorial',
    name: 'Editorial',
    theme: 'green'
  },
  {
    id: 'justice',
    name: 'Justice Dept.',
    theme: 'blue'
  },
  {
    id: 'interior',
    name: 'Dept. of Interior',
    theme: 'blue'
  }
];

export const getCategoryById = (
  id: string | null = ''
): ArticleCategory | undefined => {
  return ARTICLE_CATEGORIES.filter((c) => c.id === id)[0];
};
