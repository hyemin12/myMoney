import { ReactNode } from 'react';
import styled from 'styled-components';

import { ImageSlide, Loading } from '@/shared/components';
import BestReviewItem from './BestReviewItem';
import { LoadingContainer } from '@/features/admin/components/AdminContent';
import { IFormattedReview } from '../../models/reviews.model';

interface Props {
  reviews?: IFormattedReview[];
  isLoading?: boolean;
}

function BestReviews({ reviews, isLoading }: Props) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }
  if (!reviews) {
    return (
      <BestReviewItem
        id={0}
        img={
          'https://i0.wp.com/millionmine.com/wp-content/uploads/2020/03/reveiws.jpg?fit=1000%2C630&ssl=1'
        }
        isVerified
        title={'베스트 리뷰를 써보자!'}
        userName={'내돈내산'}
        stars={5}
        page="1/1"
      />
    );
  }
  const items: ReactNode[] = reviews.map((item, idx, arr) => {
    let page = `${idx + 1} / ${arr.length}`;
    return (
      <BestReviewItem
        id={item.id}
        img={item.reviewImg}
        isVerified={item.verified}
        title={item.title}
        userName={item.userName}
        stars={item.stars}
        page={page}
      />
    );
  });

  return (
    <BestReviewsStyle>
      {reviews && <ImageSlide items={items} />}
    </BestReviewsStyle>
  );
}

const BestReviewsStyle = styled.div`
  width: 390px;
  height: 350px;
`;

export default BestReviews;
