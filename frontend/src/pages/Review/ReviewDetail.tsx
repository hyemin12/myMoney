import { useParams } from 'react-router-dom';

import Layout from '@/layout/Layout';
import { CommentList } from '@/features/comment';
import {
  ReviewContent,
  ReviewImages,
  useReviewDetail,
} from '@/features/review';

function ReviewDetail() {
  const { id } = useParams();
  const { review } = useReviewDetail(Number(id));

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
