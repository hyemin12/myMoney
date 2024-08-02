import styled from 'styled-components';

import {
  PhotoUpload,
  StarRating,
  ReceiptUpload,
  CategorySelector,
  CreateContent,
  IReview,
} from '@/features/review';
import { Input, Button, Loading } from '@/shared/components';
import {
  ICategoryItem,
  TCategoryNames,
  useCategory,
} from '@/features/category';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface IFormControlProps {
  register: UseFormRegister<IReview>;
  setValue: UseFormSetValue<IReview>;
}

interface Props extends IFormControlProps {
  getValues: UseFormGetValues<IReview>;
  errors?: FieldErrors<IReview>;
  $mode: 'create' | 'edit';
  handleSubmit: (e: React.FormEvent) => void;
  watch: UseFormWatch<IReview>;
}

function ReviewForm({
  register,
  handleSubmit,
  setValue,
  getValues,
  $mode,
  watch,
}: Props) {
  const { categoryList } = useCategory();

  return (
    <form onSubmit={handleSubmit}>
      <PhotoUpload
        register={register}
        setValue={setValue}
        getValues={getValues}
      />
      <ReceiptUpload
        register={register}
        setValue={setValue}
        getValues={getValues}
      />
      <StarRating
        $size={24}
        setValue={setValue}
        ratingIndex={getValues!('stars' ?? 0)}
      />
      {categoryList && (
        <CategorySelector
          watch={watch}
          categoryOptions={categoryList.filter(
            (category: { id: number; name: TCategoryNames }) =>
              category.name !== '인증',
          )}
          register={register}
          setValue={setValue}
        />
      )}

      <Title>제목</Title>
      <Input
        $inputType="text"
        {...register('title', { required: '제목을 입력해주세요.' })}
      />

      <Title>내용</Title>
      <CreateContent
        register={register}
        setValue={setValue}
        getValues={getValues}
      />

      <ButtonContainer>
        <Button size="large" scheme="primary" $fullWidth={true} type="submit">
          {$mode === 'create' ? '작성하기' : '수정하기'}
        </Button>
      </ButtonContainer>
    </form>
  );
}

export default ReviewForm;

const ButtonContainer = styled.div`
  width: 360px;
`;

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.text['medium'].fontSize};
  margin: 8px 0px;
  line-height: 1.2;
`;
