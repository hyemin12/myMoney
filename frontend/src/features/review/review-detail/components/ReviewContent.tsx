import { Link, useParams } from 'react-router-dom';

import { Like, useLike } from '@/features/like';
import { formatDate } from '@/shared/utils';
import { useReviewDetail } from '../hooks/useReviewDetail';
import {
  Container,
  TitleContainer,
  ReviewInfo,
  Content,
  AuthorContainer,
} from './ReviewContent.style';
import StatRating from '../../components/StarRating';
import ReviewActions from '@/shared/components/ReviewActions';

function ReviewContent() {
  const { id } = useParams();
  if (!id) return;

  const NumberReviewId = Number(id);
  const { review } = useReviewDetail(NumberReviewId);

  if (!review) return null;

  const { likeToggle, localIsLiked, localLikes } = useLike({
    reviewId: NumberReviewId,
    isLikedDB: review?.isLiked ?? false,
    likesDB: review?.likes ?? 0,
  });

  return (
    <Container>
      <AuthorContainer>
        <h3 className="nickname">{review.name}</h3>
        <ReviewActions
          isAuthor={review.isAuthor}
          reviewId={NumberReviewId}
          authorId={review.userId}
          showIconOnly
        />
      </AuthorContainer>

      <TitleContainer>
        <h2 className="title">{review.title}</h2>
      </TitleContainer>

      <ReviewInfo>
        <Link to={`/list?categoryId=${review.categoryId}`}>
          {review.categoryName}
        </Link>
        <span>{formatDate(review.createdAt)}</span>
      </ReviewInfo>

      <StatRating ratingIndex={review.stars} $size={20} />

      <Content dangerouslySetInnerHTML={{ __html: review.content }}></Content>

      <Like isLiked={localIsLiked} likes={localLikes} onClick={likeToggle} />
    </Container>
  );
}

export default ReviewContent;
