import Layout from '@/layout/Layout';
import { ReviewList } from '@/components/common';
import { useMyReviews } from '@/hooks/useMyReviews';

const MyReviews = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useMyReviews();

  return (
    <Layout showBackButton={true} title="내가 작성한 리뷰">
      <ReviewList
        reviews={data?.pages.flatMap((page) => page.reviews) || []}
        isLoading={isLoading}
        text="작성한"
      />
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load More</button>
      )}
    </Layout>
  );
};

export default MyReviews;
