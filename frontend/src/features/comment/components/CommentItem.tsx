import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { formatDate } from '@/shared/utils';
import { Button } from '@/shared/components';
import { IComment, TCommentItemUpdate } from '@/features/comment';
import React from 'react';

interface Props {
  reviewId: number;
  comment: IComment;
  onUpdate: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  onActiveEdit: (commentId: number) => void;
  onCancelEdit: () => void;
  editMode: boolean;
}

function CommentItem({
  comment,
  onUpdate,
  onDelete,
  editMode,
  onActiveEdit,
  onCancelEdit,
}: Props) {
  const { register, handleSubmit } = useForm<TCommentItemUpdate>({
    defaultValues: { content: comment.content, id: comment.id },
  });

  const handleEdit = () => {
    onActiveEdit(comment.id);
  };

  const onSubmit = (data: TCommentItemUpdate) => {
    if (!editMode) return;
    onUpdate(data.id, data.content);
    onCancelEdit();
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  const renderButtons = () => {
    if (editMode) {
      return (
        <>
          <Button size="small" scheme="primary" type="submit">
            수정 완료
          </Button>
          <Button
            size="small"
            scheme="border"
            type="button"
            onClick={onCancelEdit}
          >
            취소
          </Button>
        </>
      );
    }

    if (comment.isAuthor) {
      return (
        <>
          <Button
            size="small"
            scheme="primary"
            type="button"
            onClick={handleEdit}
          >
            수정
          </Button>
          <Button
            size="small"
            scheme="border"
            type="button"
            onClick={handleDelete}
          >
            삭제
          </Button>
        </>
      );
    }

    return null;
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="info">
          <span>{comment.name}</span>
          <span className="date">{formatDate(comment.createdAt)}</span>
        </div>
        {editMode ? (
          <input
            {...register('content', { required: true })}
            className="editInput"
            type="text"
            autoFocus
          />
        ) : (
          <div className="cont">{comment.content}</div>
        )}
        <ButtonContainer>{renderButtons()}</ButtonContainer>
      </form>
    </Container>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 8px;
`;

const Container = styled.div`
  padding: 10px 0;

  .info {
    display: flex;
    gap: 12px;

    span {
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }
    span.date {
      color: ${({ theme }) => theme.color.border};
      font-weight: ${({ theme }) => theme.fontWeight.regular};
    }
  }

  .editInput {
    width: 100%;
    border: none;
    margin-top: 5px;
    padding: 10px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    outline: none;
  }

  .cont {
    margin-top: 5px;
    padding: 10px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    word-wrap: break-word;
  }
`;

export default React.memo(CommentItem);
