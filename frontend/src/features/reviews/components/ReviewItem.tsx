import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Dropdown, Modal, Badge } from '@/components/common';
import { Like } from '@/components/Review';
import { DotsThreeIcon } from '@/assets/icons';
import {
  Container,
  Content,
  ImgContainer,
  LikesContainer,
  TitleContainer,
  InfoContainer,
} from '../../../features/reviews/components/ReviewItem.style.ts';
import { IReviewItem } from '@/models/review.model';
import { useLike } from '@/features/like/hooks/useLike.ts';
import { formatDate } from '@/shared/utils/format.ts';
import { useReviews } from '@/features/reviews/hooks/useReviews.ts';
import { useReport } from '@/hooks/useReport';
import {
  MODAL_BTNTEXT,
  MODAL_TITLE,
  MODAL_TYPES,
} from '@/constants/modalString.ts';
import useAuthStore from '@/store/auth.store';
import { handleGoLogin } from '@/shared/utils/routingUtils.ts';
import useModal from '@/hooks/useModal.ts';

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
}: IReviewItem) {
  const { deleteReviewInReviews } = useReviews();
  const { postReport } = useReport();
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

  const { isLoggedIn } = useAuthStore();
  const { openModal, modalProps } = useModal({
    onConfirm: (option: string) => {
      if (modalProps.title === MODAL_TITLE.REPORT) {
        postReport({ reason: option, reportedUserId: userId });
      } else if (modalProps.title === MODAL_TITLE.LOGIN) {
        handleGoLogin();
      }
      if (modalProps.title === MODAL_TITLE.REVIEW_DELETE) {
        deleteReviewInReviews(id);
      }
    },
  });

  const handleReportClick = () => {
    if (!isLoggedIn) {
      openModal(MODAL_TYPES.LOGIN);
    } else {
      openModal(MODAL_TYPES.REPORT);
    }
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
          $width={100}
        >
          <ul>
            {isMyReview ? (
              <>
                <li>
                  <Link to={`/review/${id}`}>수정하기</Link>
                </li>
                <li onClick={() => deleteReviewInReviews(id)}>삭제하기</li>
              </>
            ) : (
              <li onClick={handleReportClick}>신고하기</li>
            )}
          </ul>
        </Dropdown>
      </InfoContainer>

      <Modal {...modalProps} />

      <ImgContainer>
        <Link to={`/list/${id}`}>
          {reviewImg ? (
            <>
              <img src={reviewImg} alt={title} />
            </>
          ) : null}
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
