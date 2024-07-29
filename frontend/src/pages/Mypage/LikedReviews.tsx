import Layout from '@/layout/Layout';
import { ReviewList } from '@/components/common';
import { useLikedReviews } from '@/hooks/useInfiniteReviews';
import { formatReviews } from '@/utils/formatReviews';

const LikedReviews = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useLikedReviews();
  return (
    <Layout showBackButton={true} title="좋아요 누른 리뷰">
      <ReviewList
        reviews={formatReviews(data)}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        text="좋아요를 누른"
      />
    </Layout>
  );
};

export default LikedReviews;
