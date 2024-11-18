import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from '@/layout/user/Header';
import { IReview, ReviewForm, useReviewEditing } from '@/features/review';
import { withAuthenticatedUser } from '@/shared/hocs';
import { useForm } from 'react-hook-form';

function EditReview() {
  const { id } = useParams<{ id: string }>();
  const { review, updateToReview } = useReviewEditing(id!);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    watch,
  } = useForm<IReview>({ mode: 'onChange' });

  useEffect(() => {
    if (review) {
      setValue('title', review.title || '');
      setValue('content', review.content || '');
      setValue('stars', review.stars || 3);
      setValue('categoryId', review.categoryId || 1);
      setValue('receiptImg', review.receiptImg || '');
      setValue('reviewImg', review.reviewImg || []);
    }
  }, [review, setValue]);

  const onSubmit = (data: IReview) => {
    updateToReview(id!, data);
  };

  return (
    <FormStyled>
      <Header showBackButton={true} title="리뷰 수정" />
      <ReviewForm
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        $mode="edit"
        watch={watch}
      />
    </FormStyled>
  );
}

export const FormStyled = styled.div`
  width: 390px;
  margin-inline: auto;
  padding: ${({ theme }) => theme.padding.mainContent};
`;

export default withAuthenticatedUser(EditReview);
