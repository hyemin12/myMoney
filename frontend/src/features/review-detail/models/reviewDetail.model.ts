import { IReviewEdit } from '@/features/review-editing/models/reviewEditing.model';

export interface IReviewDetail extends IReviewEdit {
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
