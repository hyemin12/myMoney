import { useForm } from 'react-hook-form';

import Header from '@/layout/user/Header';
import { FormStyled } from './EditReview';
import { withAuthenticatedUser } from '@/shared/hocs';
import { useCreateReview } from '@/features/review-editing/hooks/useCreateReview';
import useModalStore from '@/store/modal.store';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/shared/constants/paths';
import { IReviewEdit } from '@/features/review-editing/models/reviewEditing.model';
import { ReviewForm } from '@/features/review-editing';

function CreateReview() {
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    watch,
  } = useForm<IReviewEdit>({ mode: 'onChange' });

  const createReviewSuccess = () => {
    openModal('ALERT', { message: '저장되었습니다.' });
    navigate(PATH.REVIEW_LIST);
  };
  const { mutate: addToReview } = useCreateReview(createReviewSuccess);

  const onSubmit = (data: IReviewEdit) => {
    addToReview(data);
  };

  return (
    <FormStyled>
      <Header showBackButton={true} title="리뷰 작성" />

      <ReviewForm
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        $mode="create"
        watch={watch}
      />
    </FormStyled>
  );
}

export default withAuthenticatedUser(CreateReview);
