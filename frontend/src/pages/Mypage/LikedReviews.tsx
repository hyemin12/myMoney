import Layout from '@/layout/user/Layout';
import {
  ReviewList,
  transformInfiniteReview,
  useLikedReviews,
} from '@/features/reviews';

const LikedReviews = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useLikedReviews();
  return (
    <Layout showBackButton={true} title="좋아요 누른 리뷰">
      <ReviewList
        reviews={transformInfiniteReview(data)}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        text="좋아요를 누른"
      />
    </Layout>
  );
};

export default LikedReviews;
