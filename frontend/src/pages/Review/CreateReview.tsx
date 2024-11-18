import { useForm } from 'react-hook-form';

import Header from '@/layout/user/Header';
import { IReview, ReviewForm, useReviewEditing } from '@/features/review';
import { FormStyled } from './EditReview';
import { withAuthenticatedUser } from '@/shared/hocs';

function CreateReview() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    watch,
  } = useForm<IReview>({ mode: 'onChange' });

  const { addToReview } = useReviewEditing();

  const onSubmit = (data: IReview) => {
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
