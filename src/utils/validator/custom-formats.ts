export const customDate = (date: string) => {
  const dateFormat =
    /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
  if (date.match(dateFormat)) return true;
  else return false;
};

export const customSort = (sort: string) => {
  if (!sort) return true;
  if (sort === 'asc' || sort === 'desc') return true;
  else return false;
};

export const customStrNum = (num: string) => {
  if (typeof Number(num) === 'number' && Number(num) >= 1) return true;
  else return false;
};

export const customSortBy = (sortBy: string) => {
  if (
    sortBy === 'name' ||
    sortBy === 'popularity' ||
    sortBy === 'remain' ||
    sortBy === 'date'
  )
    return true;
  return false;
};
