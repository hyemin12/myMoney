import { httpClient } from '@/shared/utils/http';
import { TCommentItemWrite } from '../model/comment.model';

export const addReviewComment = async (data: TCommentItemWrite) => {
  return await httpClient.post(`/comments`, data);
};

export const updateReviewComment = async (
  commentId: number,
  data: TCommentItemWrite,
) => {
  return await httpClient.patch(`/comments/${commentId}`, data);
};

export const deleteReviewComment = async (commentId: number) => {
  return await httpClient.delete(`/comments/${commentId}`);
};
