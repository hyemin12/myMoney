import { Link } from 'react-router-dom';

import { DotsThreeIcon } from '@/assets/icons';
import { Dropdown, Badge } from '@/shared/components';
import { useLike, Like } from '@/features/like';
import {
  Container,
  Content,
  ImgContainer,
  LikesContainer,
  TitleContainer,
  InfoContainer,
  ReviewActions,
  IFormattedReview,
} from '@/features/reviews';
import { formatDate } from '@/shared/utils';
import LazyImage from '@/shared/components/LazyImage';

function ReviewItem({
  title,
  createdAt,
  userName,
  content,
  verified,
  reviewImg,
  likes,
  id,
  isLiked,
  userId,
  isMyReview,
}: IFormattedReview) {
  const { likeToggle, localIsLiked, localLikes } = useLike({
    reviewId: id,
    isLikedDB: isLiked,
    likesDB: likes,
  });

  const stripHtmlTags = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <Container>
      <InfoContainer>
        <div>
          <h4 className="name">{userName}</h4>
          <p className="date">{formatDate(createdAt)}</p>
        </div>
        <Dropdown
          toggleButton={<DotsThreeIcon />}
          $positionLnR="right"
          $positionValue={0}
          $positionTopValue={32}
          $width={120}
        >
          <ReviewActions
            isAuthor={isMyReview}
            reviewId={id}
            authorId={userId}
          />
        </Dropdown>
      </InfoContainer>

      <ImgContainer>
        <Link to={`/list/${id}`}>
          {reviewImg ? <LazyImage src={reviewImg} alt={title} /> : null}
        </Link>
        {Boolean(verified) && (
          <Badge
            type="fill"
            verifiedIcon
            text="인증된 후기"
            $position="bottom"
          />
        )}
      </ImgContainer>

      <TitleContainer>
        <Link to={`/list/${id}`}>
          <h4 className="title">{title}</h4>
        </Link>
      </TitleContainer>

      <Content>{stripHtmlTags(content)}</Content>
      <LikesContainer>
        <Like isLiked={localIsLiked} likes={localLikes} onClick={likeToggle} />
      </LikesContainer>
    </Container>
  );
}

export default ReviewItem;
