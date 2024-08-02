import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import CommentAdd from './CommentAdd';
import CommentItem from './CommentItem';
import { Loading } from '@/shared/components';
import { useComment, IComment } from '@/features/comment';

function CommentList() {
  const { id } = useParams(); // reviewId
  const { commentList, isReviewLoading, addComment, updateComment } =
    useComment(Number(id));

  if (isReviewLoading) return <Loading />;

  const handleUpdateComment = (commentId: number, content: string) => {
    if (!id) return;
    const data = { content, reviewId: id };
    // updateComment({ commentId, data });
  };

  return (
    <CommentStyle>
      <Title>댓글 {commentList?.length}</Title>
      <CommentAdd onAdd={addComment} />
      {commentList?.map((comment: IComment, index: number) => (
        <CommentItem
          key={index}
          comment={comment}
          onUpdate={handleUpdateComment}
        />
      ))}
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
