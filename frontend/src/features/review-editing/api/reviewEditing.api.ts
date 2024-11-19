import { httpClient } from '@/shared/utils/http';
import { IReview } from '../../models/review.model';

export const createReview = async (reviewData: IReview) => {
  return await httpClient.post<IReview>('/reviews', reviewData);
};

export const getReviewById = async (id: string) => {
  return await httpClient.get(`/reviews/${id}`);
};

export const updateReview = async (id: string, reviewData: IReview) => {
  return await httpClient.patch<IReview>(`/reviews/${id}`, reviewData);
};
