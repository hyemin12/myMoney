import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from '@/layout/Layout';
import { ReviewList, fetchReviews, IResponseReviews } from '@/features/reviews';
import { BestReviews } from '@/features/home';
import { Category } from '@/features/category';

function Home() {
  const [bestReviews, setBestReviews] = useState<IResponseReviews[]>([]);
  const [latestReviews, setLatestReviews] = useState([]);
  const [isLoadingBestReviews, setIsLoadingBestReviews] = useState(false);
  const [isLoadingLatestReviews, setIsLoadingLatestReviews] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingBestReviews(true);
        const bestReviewsResponse = await fetchReviews({
          sortBy: 'likes',
          orderBy: 'DESC',
          limit: 3,
        });
        setBestReviews(bestReviewsResponse.reviews);

        setIsLoadingLatestReviews(true);
        const latestReviewsResponse = await fetchReviews({
          sortBy: 'createdAt',
          orderBy: 'DESC',
        });
        setLatestReviews(latestReviewsResponse.reviews);
      } catch (error) {
        throw error;
      } finally {
        setIsLoadingBestReviews(false);
        setIsLoadingLatestReviews(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout showBackButton={false}>
      <HomeStyle>
        <BestReviews reviews={bestReviews} isLoading={isLoadingBestReviews} />
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
