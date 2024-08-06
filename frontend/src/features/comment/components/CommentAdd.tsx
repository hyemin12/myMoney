import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import useAuthStore from '@/store/auth.store';
import { TCommentItemWrite } from '../models/comment.model';
import { AlertText, Button, Input } from '@/shared/components';
import useModalStore from '@/store/modal.store';

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
  const { openModal } = useModalStore();

  const onSubmit = (data: TCommentItemWrite) => {
    if (!isLoggedIn) {
      openModal('LOGIN');
    }
    onAdd(data);
    reset();
  };

  return (
    <CommentAddStyle>
      <form>
        <fieldset>
          <Input
            $inputType="text"
            placeholder="댓글을 작성해주세요."
            {...register('content', { required: 'true' })}
          ></Input>
          {errors.content && (
            <AlertText size="medium">댓글 내용을 입력해주세요.</AlertText>
          )}
        </fieldset>
        <ButtonContainer>
          <Button
            size="small"
            scheme="primary"
            onClick={handleSubmit(onSubmit)}
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
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 8px;
`;

export default CommentAdd;
