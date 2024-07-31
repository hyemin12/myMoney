import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchLikedReviews } from '@/api/likedReviews.api';
import { fetchMyReviews } from '@/api/myReviews.api';

const useInfiniteReviews = (
  queryKey: string,
  fetchFunction: ({ pageParam }: { pageParam: number }) => Promise<any>,
) => {
  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) => fetchFunction({ pageParam }),
    getNextPageParam: (lastPage) => {
      const NumberCurrentPage = Number(lastPage.pagination.currentPage);
      const NumberTotalPages = Number(lastPage.pagination.totalCount);

      return NumberCurrentPage < NumberTotalPages
        ? NumberCurrentPage + 1
        : null;
    },
    initialPageParam: 1,
  });
};

export const useMyReviews = () =>
  useInfiniteReviews('myReviews', fetchMyReviews);
export const useLikedReviews = () =>
  useInfiniteReviews('likedReviews', fetchLikedReviews);
