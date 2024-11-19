import { useState, useEffect } from 'react';
import {
  fetchReviews,
  IFormattedReview,
  transformReview,
} from '@/features/reviews';

export const useGetHomeReviews = () => {
  const [bestReviews, setBestReviews] = useState<IFormattedReview[]>([]);
  const [latestReviews, setLatestReviews] = useState<IFormattedReview[]>([]);
  const [isLoadingBestReviews, setIsLoadingBestReviews] = useState(false);
  const [isLoadingLatestReviews, setIsLoadingLatestReviews] = useState(false);

  console.log(bestReviews, latestReviews);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingBestReviews(true);
        const bestReviewsResponse = await fetchReviews({
          sortBy: 'likes',
          orderBy: 'DESC',
          limit: 3,
        });
        setBestReviews(transformReview(bestReviewsResponse.reviews));

        setIsLoadingLatestReviews(true);
        const latestReviewsResponse = await fetchReviews({
          sortBy: 'createdAt',
          orderBy: 'DESC',
        });
        setLatestReviews(transformReview(latestReviewsResponse.reviews));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingBestReviews(false);
        setIsLoadingLatestReviews(false);
      }
    };

    fetchData();
  }, []);

  return {
    bestReviews,
    latestReviews,
    isLoadingBestReviews,
    isLoadingLatestReviews,
  };
};
