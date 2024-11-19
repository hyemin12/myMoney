export interface IReview {
  title: string;
  content: string;
  stars: number;
  categoryId: number;
  reviewImg: string[];
  receiptImg: string;
}

export interface IReviewDetail extends IReview {
  id: number;
  userId: number;
  categoryName: string;
  name: string;
  likes: number;
  isLiked: boolean;
  isAuthor: boolean;
  createdAt: string;
  verified: number;
  comments: [];
}

export interface IUnverifiedReviewItem {
  id: number;
  userId: number;
  userName: string;
  title: string;
  createdAt: string;
  receiptImg: string;
}
