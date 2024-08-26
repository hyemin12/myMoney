import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import styled from 'styled-components';

import { ReviewItem } from '@/features/reviews';
import { IReviewItem } from '@/features/review';
import { Loading } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';

export interface IReviewListProps {
  reviews: IReviewItem[];
  title?: string;
  isLoading?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => Promise<InfiniteQueryObserverResult>;
  text?: string | React.ReactNode;
}

function ReviewList({
  reviews,
  title,
  isLoading,
  text,
  fetchNextPage,
  hasNextPage,
}: IReviewListProps) {
  const { observerRef } = useIntersectionObserver(fetchNextPage);

  return (
    <>
      {title && <Title>{title}</Title>}

      {reviews.length === 0 &&
        (typeof text === 'string' ? (
          <EmptyReviews>{text} 리뷰가 없습니다.</EmptyReviews>
        ) : (
          text
        ))}

      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}

      {isLoading && (
        <LoadingContainer data-testid="loading-container">
          <Loading />
        </LoadingContainer>
      )}

      {hasNextPage && (
        <ObserverDiv
          data-testid="observer-ref"
          id="more"
          ref={observerRef}
        ></ObserverDiv>
      )}
    </>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const EmptyReviews = styled.p`
  padding-top: 45vh;
  text-align: center;
`;

const ObserverDiv = styled.div`
  height: 1px;
`;

export const Title = styled.h3`
  padding: 0 16px;
  font-size: ${({ theme }) => theme.heading['medium'].fontSize};
  font-weight: ${({ theme }) => theme.fontWeight['bold']};
`;

export default ReviewList;
