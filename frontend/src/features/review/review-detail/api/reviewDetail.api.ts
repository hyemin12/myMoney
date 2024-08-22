import { httpClient } from '@/shared/utils/http';
import { IReviewDetail } from '../../models/review.model';

export interface IFetchReviewsParams {
  categoryId?: number;
  isVerified?: true;
  currentPage?: number;
  query?: string;
  sortBy?: string;
  orderBy?: string;
  limit?: number;
}

export const fetchReview = async (reviewId: number) => {
  const { data } = await httpClient.get<IReviewDetail>(`/reviews/${reviewId}`);
  return data;
};

export const deleteReview = async (reviewId: number) => {
  const { data } = await httpClient.delete(`/reviews/${reviewId}`);
  return data;
};
