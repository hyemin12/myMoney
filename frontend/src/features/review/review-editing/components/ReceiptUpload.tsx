import React, { useRef, useState } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import styled from 'styled-components';

import { convertToBase64, IReview } from '@/features/review';
import { Button } from '@/shared/components';
import { IFormControlProps } from './ReviewForm';

interface Props extends IFormControlProps {
  getValues: UseFormGetValues<IReview>;
}

function ReceiptUpload({ register, setValue, getValues }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [receiptImg, setReceiptImg] = useState<string>(
    getValues('receiptImg') ?? '',
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        const receipt = await convertToBase64(files[0]);
        setValue('receiptImg', receipt);
        setReceiptImg(receipt);
      } catch (error) {
        console.error('Error converting file to base64:', error);
      }
    }
  };

  const handleClick = () => {
    console.log(fileInputRef);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        style={{ display: 'none' }}
        {...register('receiptImg')}
        onChange={handleFileChange}
        multiple
        ref={fileInputRef}
      />
      <ButtonContainer onClick={handleClick}>
        <Button
          size="medium"
          scheme={receiptImg === '' ? 'disabled' : 'primary'}
          disabled={receiptImg === ''}
          $fullWidth={true}
          aria-label="영수증 리뷰 인증"
        >
          영수증 리뷰 인증
        </Button>
      </ButtonContainer>
    </>
  );
}

export default ReceiptUpload;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 358px;
`;
