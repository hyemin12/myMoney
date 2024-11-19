import { useMutation } from '@tanstack/react-query';
import { TCommentItemWrite } from '../models/comment.model';
import { queryClient } from '@/shared/utils';
import { addReviewComment } from '../api/comment.api';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

export const useAddComment = (reviewId: number) => {
  return useMutation({
    mutationFn: (data: TCommentItemWrite) =>
      addReviewComment({ ...data, reviewId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMENTS, reviewId],
      });
    },
  });
};
