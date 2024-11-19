import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERYSTRING } from '@/shared/constants/querystring';
import { fetchReviews } from '../api/reviews.api';
import { transformInfiniteReview } from '../utils/formattedReviews';
import { QUERY_KEYS } from '@/shared/constants/querykeys';
import { IReviewsParams } from '../models/reviews.model';

export const useInfiniteReviewListWithParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /** 쿼리스트링
   * - categoryIdParams: 카테고리 아이디
   * - isVerifiedParams: 인증 후기 가져오기
   * - pageParams: 페이지
   * - queryParams: 검색 결과
   */
  const getQueryParams = (searchParams: URLSearchParams): IReviewsParams => {
    const categoryId = searchParams.get(QUERYSTRING.CATEGORY_ID);
    const isVerified = searchParams.has(QUERYSTRING.IS_VERIFIED);
    const query = searchParams.get(QUERYSTRING.QUERY);
    const limit = searchParams.get(QUERYSTRING.LIMIT);

    return {
      categoryId: categoryId ? Number(categoryId) : undefined,
      isVerified: isVerified ? true : undefined,
      query: query ? String(query) : undefined,
      limit: limit ? Number(limit) : 10,
    };
  };

  const fetchReviewsData = (pageParams: number) => {
    const params = getQueryParams(searchParams);
    return fetchReviews({
      ...params,
      currentPage: pageParams,
    });
  };

  const updateParams = (updates: Record<string, string | null>) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });
      return newParams;
    });
  };

  const {
    data: reviews,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.REVIEWS, searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchReviewsData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const NumberCurrentPage = Number(lastPage.pagination.currentPage);
      const NumberTotalPages = Number(lastPage.pagination.totalCount);

      return NumberCurrentPage < NumberTotalPages
        ? NumberCurrentPage + 1
        : null;
    },
  });

  const formattedData = transformInfiniteReview(reviews);

  return {
    reviews: formattedData,
    updateParams,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
};
