import { httpClient } from '@/shared/utils/http';
import { IReviewDetail } from '../models/review-detail.model';

export const fetchReview = async (reviewId: number) => {
  const { data } = await httpClient.get<IReviewDetail>(`/reviews/${reviewId}`);
  return data;
};

export const deleteReview = async (reviewId: number) => {
  const { data } = await httpClient.delete(`/reviews/${reviewId}`);
  return data;
};
