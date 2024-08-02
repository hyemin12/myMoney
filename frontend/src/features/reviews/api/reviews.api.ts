export const fetchReviews = async (params: IFetchReviewsParams) => {
  const { data } = await httpClient.get('/reviews', {
    params: { ...params },
  });
  return data;
};

export const fetchMyReviews = async ({ pageParam = 1 }) => {
  const response = await httpClient.get(
    `/reviews?myReviews=true&page=${pageParam}`,
  );
  return response.data;
};

import { httpClient } from '@/shared/utils/http';

export const fetchLikedReviews = async ({ pageParam = 1 }) => {
  const response = await httpClient.get(
    `/reviews?liked=true&page=${pageParam}`,
  );
  return response.data;
};
