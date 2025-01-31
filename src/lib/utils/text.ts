export const plural = (number: number, singular: string, plural: string) => {
  return number === 1 ? singular : plural;
};
