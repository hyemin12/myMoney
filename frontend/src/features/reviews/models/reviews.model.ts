export interface IReviewsResponse {
  categoryId: number;
  content: string;
  createdAt: Date;
  id: number;
  isMyReview: number;
  likes: number;
  reviewImg: string;
  stars: number;
  title: string;
  userId: number;
  userName: string;
  verified: number;
  isLiked: number;
}
export interface IInfiniteReviewsResponse {
  pages: {
    reviews: IReviewsResponse[];
    pagination: { currentPage: number; totalCount: number };
  }[];
  nextPage?: number;
}
export interface IFormattedReview
  extends Omit<
    IReviewsResponse,
    'createdAt' | 'isMyReview' | 'verified' | 'isLiked'
  > {
  createdAt: string;
  isMyReview: boolean;
  verified: boolean;
  isLiked: boolean;
}

export interface IReviewsParams {
  categoryId?: number;
  isVerified?: true;
  currentPage?: number;
  query?: string;
  sortBy?: string;
  orderBy?: string;
  limit?: number;
}
