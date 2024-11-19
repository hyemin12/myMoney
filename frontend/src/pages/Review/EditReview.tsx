import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from '@/layout/user/Header';
import { withAuthenticatedUser } from '@/shared/hocs';
import { useForm } from 'react-hook-form';
import { IReviewEdit } from '@/features/review-editing/models/reviewEditing.model';
import { useUpdateReview } from '@/features/review-editing/hooks/useUpdateReview';
import useModalStore from '@/store/modal.store';
import { PATH } from '@/shared/constants/paths';
import { useGetReviewDetail } from '@/features/review-detail';
import { ReviewForm } from '@/features/review-editing';
import { Loading } from '@/shared/components';

function EditReview() {
  const { id } = useParams<{ id: string }>();
  const reviewId = Number(id);

  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const updateToReviewSuccess = () => {
    openModal('ALERT', { message: '수정되었습니다.' });
    navigate(`${PATH.REVIEW_LIST}/${reviewId}`);
  };
  const { mutate: updateToReview } = useUpdateReview(updateToReviewSuccess);

  const { data: review, isLoading } = useGetReviewDetail(reviewId);
  console.log(review);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<IReviewEdit>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      stars: 3,
      categoryId: 1,
      receiptImg: '',
      reviewImg: [],
    },
  });

  useEffect(() => {
    if (review) {
      console.log(review.stars, review.receiptImg, review.reviewImg);
      // setValue('title', review.title);
      // setValue('content', review.content);
      // setValue('stars', review.stars);
      // setValue('categoryId', review.categoryId);
      // setValue('receiptImg', review.receiptImg);
      // setValue('reviewImg', review.reviewImg);
      reset(review);
    }
  }, [review, reset]);

  const onSubmit = (data: IReviewEdit) => {
    if (!id) return;
    updateToReview({ id, data });
  };

  return (
    <FormStyled>
      <Header showBackButton={true} title="리뷰 수정" />

      {isLoading ? (
        <Loading />
      ) : (
        <ReviewForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          $mode="edit"
          watch={watch}
        />
      )}
    </FormStyled>
  );
}

export const FormStyled = styled.div`
  width: 390px;
  margin-inline: auto;
  padding: ${({ theme }) => theme.padding.mainContent};
`;

export default withAuthenticatedUser(EditReview);
