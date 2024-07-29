import { IReviewItem } from '@/models/review.model';

interface ReviewsData {
  pages: {
    reviews: IReviewItem[];
    pagination: { currentPage: number; totalCount: number };
  }[];
  nextPage?: number;
}

export const formatReviews = (data: ReviewsData | undefined): IReviewItem[] => {
  if (!data) return [];

  return data.pages.flatMap((page) =>
    page.reviews.map((review) => ({
      ...review,
      isMyReview: Boolean(review.isMyReview),
      isLiked: Boolean(review.isLiked),
      verified: Boolean(review.verified),
    })),
  );
};