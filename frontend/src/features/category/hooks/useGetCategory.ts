import { useQuery } from '@tanstack/react-query';
import { fetchCategory } from '../api/category.api';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

export function useGetCategory() {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORY],
    queryFn: fetchCategory,
    throwOnError: true,
  });
}
