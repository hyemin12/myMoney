import styled from 'styled-components';

import Layout from '@/layout/user/Layout';
import {
  ReviewList,
  useInfiniteReviewListWithParams,
} from '@/features/reviews';
import { Category } from '@/features/category';

function ReviewListPage() {
  const { reviews, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteReviewListWithParams();

  return (
    <Layout title="리뷰 목록" showBackButton={false}>
      <CategoryWrapper>
        <Category />
      </CategoryWrapper>

      <ReviewList
        reviews={reviews}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Layout>
  );
}

const CategoryWrapper = styled.div`
  margin-bottom: 18px;
  border-bottom: 4px solid ${({ theme }) => theme.color.background};
  > div {
    .items {
      margin-bottom: 10px;
    }
  }
`;

export default ReviewListPage;
