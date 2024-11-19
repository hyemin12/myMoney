import { useQuery } from '@tanstack/react-query';
import { fetchReview } from '../api/reviewDetail.api';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

export const useGetReviewDetail = (reviewId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REVIEW_DETAIL],
    queryFn: () => fetchReview(reviewId),
    throwOnError: true,
  });
};
