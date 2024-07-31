import styled from 'styled-components';

import {
  PhotoUpload,
  StarRating,
  ReceiptUpload,
  CategorySelector,
  CreateContent,
} from '@/components/Review';
import { Input, Button } from '@/components/common';
import { useCategory } from '@/hooks/useCategory';

interface ReviewFormProps {
  titleValue: string;
  contentValue: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  ratingIndex: number;
  setRatingIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedCategoryId: number;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number>>;
  receiptImg: string;
  setReceiptImg: React.Dispatch<React.SetStateAction<string>>;
  photoToAddList: string[];
  setPhotoToAddList: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: () => void;
  isFormValid: boolean;
}

function ReviewForm({
  titleValue,
  contentValue,
  setTitle,
  setContent,
  ratingIndex,
  setRatingIndex,
  receiptImg,
  setReceiptImg,
  selectedCategoryId,
  setSelectedCategoryId,
  photoToAddList,
  setPhotoToAddList,
  handleSubmit,
  isFormValid,
}: ReviewFormProps) {
  const { categoryList } = useCategory();

  return (
    <>
      <PhotoUpload
        photoToAddList={photoToAddList}
        setPhotoToAddList={setPhotoToAddList}
      />

      <ReceiptUpload receiptImg={receiptImg} setReceiptImg={setReceiptImg} />

      <StarRating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />

      <CategorySelector
        categoryOptions={categoryList}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />

      <Title>제목</Title>
      <Input
        $inputType="text"
        type="text"
        placeholder="제목을 입력해주세요"
        value={titleValue}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Title>내용</Title>
      <CreateContent content={contentValue} onChange={setContent} />

      <ButtonContainer>
        <Button
          size="large"
          scheme="primary"
          $fullWidth={true}
          type="submit"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          완료
        </Button>
      </ButtonContainer>
    </>
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
