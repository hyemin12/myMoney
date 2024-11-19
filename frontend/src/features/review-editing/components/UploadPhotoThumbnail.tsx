import styled from 'styled-components';

import { CloseIcon } from '@/assets/icons';
import { Icon } from '@/shared/components';

interface Props {
  list: string[];
  handleRemovePhoto: (i: number) => void;
}

export default function UploadPhotoThumbnail({
  list,
  handleRemovePhoto,
}: Props) {
  if (!list) return;

  return list.map((url: string, index: number) => (
    <PhotoPreview key={index}>
      <CloseButton onClick={() => handleRemovePhoto(index)}>
        <Icon width={12} fill="white" icon={<CloseIcon />} />
      </CloseButton>
      <img src={url} alt={`Photo ${index}`} />
    </PhotoPreview>
  ));
}
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
