import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { fetchReviews, IFetchReviewsParams } from '@/api/review.api';
import { QUERYSTRING } from '@/constants/querystring';
import { deleteReview } from '@/api/review.api';
import { formatReviews } from '@/features/reviews/formatReviews';

export const useReviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /** 쿼리스트링 분석
   * - categoryIdParams: 카테고리 아이디
   * - isVerifiedParams: 인증 후기 가져오기
   * - pageParams: 페이지
   * - queryParams: 검색 결과
   */
  const getQueryParams = (
    searchParams: URLSearchParams,
  ): IFetchReviewsParams => {
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
    refetch,
  } = useInfiniteQuery({
    queryKey: ['fetchReviews', searchParams.toString()],
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

  const formattedData = formatReviews(reviews);

  const onSuccessHandler = (message: string) => {
    return () => {
      alert(message);
      refetch();
    };
  };

  const deleteReviewInReviewsMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: onSuccessHandler('후기가 삭제되었습니다.'),
    throwOnError: true,
  });

  const deleteReviewInReviews = (reviewId: number) => {
    deleteReviewInReviewsMutation.mutate(reviewId);
  };
  return {
    reviews: formattedData,
    updateParams,
    isLoadingFetchReviews: isLoading,
    fetchReviewsNextPage: fetchNextPage,
    hasNextPageFetchReviews: hasNextPage,
    deleteReviewInReviews,
  };
};
