import styled from 'styled-components';

import Layout from '@/layout/user/Layout';
import {
  ReviewList,
  BestReviews as BestReviewContainer,
  useQueryReviewList,
} from '@/features/reviews';
import { Category } from '@/features/category';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

function Home() {
  const { data: bestReviewsResponse, isLoading: isLoadingBestReviews } =
    useQueryReviewList(
      {
        sortBy: 'likes',
        orderBy: 'DESC',
        limit: 3,
      },
      [QUERY_KEYS.BEST_REVIEWS],
    );
  const bestReviews = bestReviewsResponse?.reviews ?? [];

  const { data: latestReviewsResponse, isLoading: isLoadingLatestReviews } =
    useQueryReviewList(
      {
        sortBy: 'createdAt',
        orderBy: 'DESC',
        limit: 10,
      },
      [QUERY_KEYS.LATEST_REVIEWS],
    );
  const latestReviews = latestReviewsResponse?.reviews ?? [];

  return (
    <Layout showBackButton={false}>
      <HomeStyle>
        <BestReviewContainer
          reviews={bestReviews}
          isLoading={isLoadingBestReviews}
        />
        <Category />
        <hr />
        <ReviewList
          title={'최신글'}
          reviews={latestReviews}
          isLoading={isLoadingLatestReviews}
          text={'최신'}
        />
      </HomeStyle>
    </Layout>
  );
}

const HomeStyle = styled.div`
  max-width: 100%;
  max-height: 100%;

  hr {
    margin: 20px 0;
  }
`;

export default Home;
