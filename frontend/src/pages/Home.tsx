import styled from 'styled-components';

import Layout from '@/layout/user/Layout';
import {
  ReviewList,
  BestReviews as BestReviewContainer,
} from '@/features/reviews';
import { Category } from '@/features/category';
import { useGetHomeReviews } from '@/features/reviews';

function Home() {
  const {
    bestReviews,
    latestReviews,
    isLoadingBestReviews,
    isLoadingLatestReviews,
  } = useGetHomeReviews();

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
