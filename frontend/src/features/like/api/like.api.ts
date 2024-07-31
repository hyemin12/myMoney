import { httpClient } from '@/shared/utils/http';

export const likeReview = async (reviewId: number) => {
  const { data } = await httpClient.post(`/likes/${reviewId}`);
  return data;
};

export const unlikeReview = async (reviewId: number) => {
  const { data } = await httpClient.delete(`/likes/${reviewId}`);
  return data;
};
