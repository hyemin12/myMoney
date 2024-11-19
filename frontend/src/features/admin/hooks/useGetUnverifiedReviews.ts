import { useQuery } from '@tanstack/react-query';
import { getUnverifiedReviews } from '../api/admin.api';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

export const useGetUnverifiedReviews = (page: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_GET_UNVERIFIED_REVIEWS, page],
    queryFn: () => getUnverifiedReviews(page),
    throwOnError: true,
  });
};
