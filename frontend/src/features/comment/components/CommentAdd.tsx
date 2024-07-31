import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Button, Input, Modal } from '@/components/common';
import { TCommentItemWrite } from '@/models/comment.model';
import useAuthStore from '@/store/auth.store';
import { MODAL_BTNTEXT, MODAL_TITLE } from '@/constants/modalString';

interface Props {
  onAdd: (data: TCommentItemWrite) => void;
}

function CommentAdd({ onAdd }: Props) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCommentItemWrite>();
  const { isLoggedIn } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = (data: TCommentItemWrite) => {
    onAdd(data);
    reset();
  };

  return (
    <CommentAddStyle>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        buttonText={MODAL_BTNTEXT.LOGIN}
        title={MODAL_TITLE.LOGIN}
        onConfirm={() => navigate(`/login`)}
      />
      <form>
        <fieldset>
          <Input
            $inputType="text"
            placeholder="댓글을 작성해주세요."
            {...register('content', { required: 'true' })}
          ></Input>
          {errors.content && (
            <p className="error-text">댓글 내용을 입력해주세요.</p>
          )}
        </fieldset>
        <ButtonContainer>
          <Button
            size="small"
            scheme="primary"
            onClick={!isLoggedIn ? openModal : handleSubmit(onSubmit)}
          >
            등록
          </Button>
        </ButtonContainer>
      </form>
    </CommentAddStyle>
  );
}

const CommentAddStyle = styled.div`
  margin: 20px 0 5px;

  form {
    display: flex;
    flex-direction: column;

    .error-text {
      font-size: ${({ theme }) => theme.text.small.fontSize};
      color: red;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 8px;
`;

export default CommentAdd;