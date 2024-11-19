import React, { useEffect, useRef, useState } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import styled from 'styled-components';

import { CameraIcon } from '@/assets/icons';
import { IFormControlProps } from './ReviewForm';
import { IReviewEdit } from '../models/reviewEditing.model';
import convertToBase64 from '../utils/convertToBase64';
import UploadPhotoThumbnail from './UploadPhotoThumbnail';

interface Props extends IFormControlProps {
  getValues: UseFormGetValues<IReviewEdit>;
}
function PhotoUpload({ register, setValue, getValues }: Props) {
  const [photoToAddList, setPhotoToAddList] = useState<string[]>([]);

  useEffect(() => {
    const initialPhotos = getValues('reviewImg') ?? [];
    setPhotoToAddList(initialPhotos);
  }, []);

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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotoToAddList((prevList) => prevList.filter((_, i) => i !== index));
  };

  console.log(photoToAddList);
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
      <Button type="button" onClick={handleClick} aria-label="사진 첨부">
        <CameraIcon />
        <p>사진 첨부</p>
      </Button>

      <UploadPhotoThumbnail
        list={photoToAddList}
        handleRemovePhoto={handleRemovePhoto}
      />
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
