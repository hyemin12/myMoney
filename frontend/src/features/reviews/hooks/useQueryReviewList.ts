import { QUERY_KEYS } from '@/shared/constants/querykeys';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../api/reviews.api';
import { IReviewsParams } from '../models/reviews.model';

export const useQueryReviewList = (
  params: IReviewsParams,
  queryKey: string[],
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REVIEWS, ...queryKey],
    queryFn: () => fetchReviews(params),
  });
};
