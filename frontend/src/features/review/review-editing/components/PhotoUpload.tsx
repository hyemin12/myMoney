import React, { useRef, useState } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import styled from 'styled-components';

import { CameraIcon, CloseIcon } from '@/assets/icons';
import { convertToBase64, IReview } from '@/features/review';
import { Icon } from '@/shared/components';
import { IFormControlProps } from './ReviewForm';

interface Props extends IFormControlProps {
  getValues: UseFormGetValues<IReview>;
}

function PhotoUpload({ register, setValue, getValues }: Props) {
  const [photoToAddList, setPhotoToAddList] = useState<string[]>(
    getValues('reviewImg') ?? [],
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const imageArray: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const base64 = await convertToBase64(file);
          imageArray.push(base64);
        } catch (error) {
          console.error('Error converting file to base64:', error);
        }
      }

      const updatedPhotoList = [...photoToAddList, ...imageArray];
      setPhotoToAddList(updatedPhotoList);
      setValue('reviewImg', updatedPhotoList);
    }
  };

  const handleClick = () => {
    console.log(fileInputRef);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotoToAddList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const renderPhotoPreviews = () => {
    return photoToAddList.map((url: string, index: number) => (
      <PhotoPreview key={index}>
        <CloseButton onClick={() => handleRemovePhoto(index)}>
          <Icon width={12} fill="white" icon={<CloseIcon />} />
        </CloseButton>
        <img src={url} alt={`Photo ${index}`} />
      </PhotoPreview>
    ));
  };

  return (
    <Container>
      <input
        type="file"
        style={{ display: 'none' }}
        {...register('reviewImg')}
        onChange={handleFileChange}
        multiple
        ref={fileInputRef}
      />
      <Button onClick={handleClick} aria-label="사진 첨부">
        <CameraIcon />
        <p>사진 첨부</p>
      </Button>

      {renderPhotoPreviews()}
    </Container>
  );
}

export default PhotoUpload;

const Container = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid ${({ theme }) => theme.color.border};
  background-color: white;
  margin-right: 10px;

  p {
    font-size: ${({ theme }) => theme.text.small.fontSize};
  }
`;

const PhotoPreview = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  right: -5px;
  background-color: black;
  width: 18px;
  height: 18px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;
