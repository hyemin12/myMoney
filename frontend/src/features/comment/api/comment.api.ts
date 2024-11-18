import { httpClient } from '@/shared/utils/http';
import {
  IGetCommentsResponse,
  TCommentItemWrite,
} from '../models/comment.model';

export const getComments = async (reviewId: number) => {
  const { data } = await httpClient.get<IGetCommentsResponse>(
    `/comments/${reviewId}`,
  );
  return data;
};

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
