import { useQuery, useMutation } from '@tanstack/react-query';

import { queryClient } from '@/shared/utils/queryClient';
import { TCommentItemWrite } from '../model/comment.model';
import {
  addReviewComment,
  deleteReviewComment,
  updateReviewComment,
} from '../api/comment.api';
import { fetchReview } from '@/features/review';

export function useComment(reviewId: number) {
  if (!reviewId) {
    return {
      comments: undefined,
      isReviewLoading: false,
      addComment: () => {},
      updateComment: () => {},
      deleteComment: () => {},
    };
  }

  const { data: commentList, isLoading: isReviewLoading } = useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => fetchReview(reviewId),
    enabled: !!reviewId,
    select: (data) => data.comments,
  });

  const { mutate: addComment } = useMutation({
    mutationFn: (data: TCommentItemWrite) =>
      addReviewComment({ ...data, reviewId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review', reviewId] });
    },
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: (variables: { commentId: number; data: TCommentItemWrite }) =>
      updateReviewComment(variables.commentId, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review', reviewId] });
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (commentId: number) => deleteReviewComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review', reviewId] });
    },
  });

  return {
    commentList,
    isReviewLoading,
    addComment,
    updateComment,
    deleteComment,
  };
}
