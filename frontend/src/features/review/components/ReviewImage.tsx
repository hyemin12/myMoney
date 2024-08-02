import { Badge } from '@/shared/components';
import styled from 'styled-components';

interface ReviewImageProps {
  imgSrc: string;
  title: string;
  isVerified: boolean;
}

function ReviewImage({ imgSrc, title, isVerified }: ReviewImageProps) {
  return (
    <ReviewImageStyle>
      <img src={imgSrc} alt={title + '이미지'} />
      {isVerified ? (
        <Badge type="fill" $position="bottom" verifiedIcon text="인증된 후기" />
      ) : null}
    </ReviewImageStyle>
  );
}

export const ReviewImageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 390px;
  border-radius: 6px;
  overflow: hidden;
  img {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ReviewImage;
