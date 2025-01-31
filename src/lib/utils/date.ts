export const getTodaysDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getFormattedDate = (date: Date, dateStyle: 'medium' | 'long') => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle
  }).format(date);
};
