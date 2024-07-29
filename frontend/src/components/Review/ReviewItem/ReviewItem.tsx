import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Dropdown, Modal, Badge } from '@/components/common';
import { Like } from '@/components/Review';
import { DotsThree } from '@/assets/icons';
import {
  Container,
  Content,
  ImgContainer,
  LikesContainer,
  TitleContainer,
  InfoContainer,
} from './ReviewItem.style.ts';
import { IReviewItem } from '@/models/review.model';
import { useLike } from '@/hooks/useLike';
import { formatDate } from '@/utils/format';
import { useReviews } from '@/hooks/useReviews';
import { useReport } from '@/hooks/useReport';
import {
  MODAL_BTNTEXT,
  MODAL_TITLE,
  MODAL_TYPES,
} from '@/constance/modalString';
import useAuthStore from '@/store/auth.store';
import { handleGoLogin } from '@/utils/routingUtils';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const { isLoggedIn } = useAuthStore();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReportClick = () => {
    if (!isLoggedIn) {
      setModalType(MODAL_TYPES.LOGIN);
      setIsModalOpen(true);
      return;
    }
    setModalType(MODAL_TYPES.REPORT);
    openModal();
  };

  const handleConfirm = (option: string) => {
    if (modalType === MODAL_TYPES.LOGIN) {
      handleGoLogin();
    }
    postReport({ reason: option, reportedUserId: userId });

    closeModal();
  };

  return (
    <Container>
      <InfoContainer>
        <div>
          <h4 className="name">{userName}</h4>
          <p className="date">{formatDate(createdAt)}</p>
        </div>
        <Dropdown
          toggleButton={<DotsThree />}
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalType === MODAL_TYPES.LOGIN
            ? MODAL_TITLE.LOGIN
            : MODAL_TITLE.REPORT
        }
        buttonText={
          modalType === MODAL_TYPES.LOGIN
            ? MODAL_BTNTEXT.LOGIN
            : MODAL_BTNTEXT.REPORT
        }
        report={modalType === MODAL_TYPES.REPORT}
        onConfirm={handleConfirm}
      />

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
            position="bottom"
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
