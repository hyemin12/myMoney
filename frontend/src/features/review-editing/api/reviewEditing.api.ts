import { httpClient } from '@/shared/utils/http';
import { IReviewEdit } from '../models/reviewEditing.model';

export const createReview = async (reviewData: IReviewEdit) => {
  return await httpClient.post<IReviewEdit>('/reviews', reviewData);
};

export const getReviewById = async (id: string) => {
  return await httpClient.get(`/reviews/${id}`);
};

export const updateReview = async (id: string, reviewData: IReviewEdit) => {
  return await httpClient.patch<IReviewEdit>(`/reviews/${id}`, reviewData);
};
