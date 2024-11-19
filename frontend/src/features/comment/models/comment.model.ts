export interface IComment {
  id: number;
  userId: number;
  name: string;
  content: string;
  createdAt: string;
  isAuthor: boolean;
}

export type TCommentItemWrite = {
  content: IComment['content'];
  reviewId: number;
};

export type TCommentItemUpdate = {
  content: IComment['content'];
  id: IComment['id'];
};

export interface IGetCommentsResponse {
  comments: IComment[];
  status: number;
}
