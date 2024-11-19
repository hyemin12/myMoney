import Layout from '@/layout/user/Layout';
import {
  transformInfiniteReview,
  ReviewList,
  useMyReviews,
} from '@/features/reviews';

const MyReviews = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useMyReviews();

  return (
    <Layout showBackButton={true} title="내가 작성한 리뷰">
      <ReviewList
        reviews={transformInfiniteReview(data)}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        text="작성한"
      />
    </Layout>
  );
};

export default MyReviews;
