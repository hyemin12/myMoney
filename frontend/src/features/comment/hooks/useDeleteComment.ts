import { useMutation } from '@tanstack/react-query';
import { deleteReviewComment } from '../api/comment.api';
import { queryClient } from '@/shared/utils';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

export const useDeleteComment = (reviewId: number) => {
  return useMutation({
    mutationFn: (commentId: number) => deleteReviewComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMENTS, reviewId],
      });
    },
  });
};
