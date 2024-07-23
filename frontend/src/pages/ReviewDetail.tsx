import { useParams } from 'react-router-dom';

import Layout from '@/layout/Layout';
import { CommentList } from '@/components/Comment';
import { ReviewContent, ReviewImageSlide } from '@/components/Review';
import { useReviewDetail } from '@/hooks/useReviewDetail';

function ReviewDetail() {
  const { id } = useParams();
  const { review } = useReviewDetail(id);

  if (!review) return;

  return (
    <Layout showBackButton={true}>
      <article>
        <ReviewImageSlide
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
