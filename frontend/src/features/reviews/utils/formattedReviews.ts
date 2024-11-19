import {
  IFormattedReview,
  IInfiniteReviewsResponse,
  IReviewsResponse,
} from '../models/reviews.model';

export const transformReview = (
  reviews: IReviewsResponse[],
): IFormattedReview[] => {
  if (!reviews) return [];

  return reviews.map((review) => ({
    ...review,
    createdAt: new Date(review.createdAt).toISOString(),
    isMyReview: Boolean(review.isMyReview),
    isLiked: Boolean(review.isLiked),
    verified: Boolean(review.verified),
  }));
};

export const transformInfiniteReview = (
  reviews: IInfiniteReviewsResponse | undefined,
): IFormattedReview[] => {
  if (!reviews) return [];

  return reviews.pages.flatMap((page) => transformReview(page.reviews));
};
