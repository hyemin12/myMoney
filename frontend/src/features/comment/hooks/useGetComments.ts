import { getComments } from '@/features/comment';
import { QUERY_KEYS } from '@/shared/constants/querykeys';
import { useQuery } from '@tanstack/react-query';

export const useGetComments = (reviewId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, reviewId],
    queryFn: () => getComments(reviewId),
    enabled: !!reviewId,
  });
};
