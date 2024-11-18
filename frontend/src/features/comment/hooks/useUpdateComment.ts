import { updateReviewComment } from '../api/comment.api';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/utils';
import { TCommentItemWrite } from '../models/comment.model';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

export const useUpdateComment = (reviewId: number) => {
  return useMutation({
    mutationFn: (variables: { commentId: number; data: TCommentItemWrite }) =>
      updateReviewComment(variables.commentId, variables.data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMENTS, reviewId],
      });
    },
  });
};
