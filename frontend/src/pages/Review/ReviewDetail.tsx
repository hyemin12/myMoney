import { useParams } from 'react-router-dom';

import Layout from '@/layout/user/Layout';
import { CommentList } from '@/features/comment';
import { ReviewContent, useGetReviewDetail } from '@/features/review-detail';
import { ReviewImages } from '@/shared/components';

function ReviewDetail() {
  const { id } = useParams();
  const { data: review } = useGetReviewDetail(Number(id));

  if (!review) return;

  return (
    <Layout showBackButton={true}>
      <article>
        <ReviewImages
          isVerified={Boolean(review.verified)}
          reviewImages={review.reviewImg}
          title={review.title}
        />

        <ReviewContent />

        <CommentList />
      </article>
    </Layout>
  );
}

export default ReviewDetail;
