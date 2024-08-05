export const calcIndex = (currentPage: number, idx: number) => {
  const LIMIT = 12;
  const page = currentPage - 1;

  return LIMIT * page + idx + 1;
};
