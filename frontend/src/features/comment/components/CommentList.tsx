import { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import CommentAdd from './CommentAdd';
import CommentItem from './CommentItem';
import { Loading } from '@/shared/components';
import {
  IComment,
  useGetComments,
  useUpdateComment,
  useAddComment,
  useDeleteComment,
} from '@/features/comment';
import { handleGoHome } from '@/shared/utils';

function CommentList() {
  const { id } = useParams(); // reviewId
  const reviewId = Number(id);

  if (isNaN(reviewId)) {
    handleGoHome();
  }

  const [editState, setEditState] = useState<{
    commentId: null | number;
    mode: boolean;
  }>({ commentId: null, mode: false });

  const handleCancelEditState = () => {
    setEditState({ commentId: null, mode: false });
  };

  const handleActiveEditState = (commentId: number) => {
    setEditState({ commentId, mode: true });
  };

  const { data, isLoading } = useGetComments(reviewId);
  const comments = data?.comments ?? [];

  const { mutate: addComment } = useAddComment(reviewId);
  const { mutate: updateComment } = useUpdateComment(reviewId);
  const { mutate: deleteComment } = useDeleteComment(reviewId);

  const handleUpdateComment = (commentId: number, content: string) => {
    const data = { content, reviewId };
    updateComment({ commentId, data });
  };

  const handleDeleteComment = (commentId: number) => {
    if (!commentId) return;
    deleteComment(commentId);
  };

  if (isLoading) return <Loading />;
  if (!data) return <p>데이터를 불러오지 못했습니다.</p>;

  return (
    <CommentStyle>
      <Title>댓글 {comments?.length}</Title>

      <CommentAdd onAdd={addComment} />

      {comments?.length <= 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments?.map((comment: IComment) => (
          <CommentItem
            key={comment.id}
            reviewId={reviewId}
            comment={comment}
            onDelete={handleDeleteComment}
            onUpdate={handleUpdateComment}
            editMode={comment.id === editState.commentId && editState.mode}
            onActiveEdit={handleActiveEditState}
            onCancelEdit={handleCancelEditState}
          />
        ))
      )}
    </CommentStyle>
  );
}

const CommentStyle = styled.section`
  padding: ${({ theme }) => theme.padding.mainContent};
  margin: 20px 0;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.heading.medium.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default CommentList;
