import { useSearchParams } from 'react-router-dom';

export const useCurrentPage = () => {
  const [searchParams] = useSearchParams();
  return Number(searchParams.get('page')) || 1;
};
