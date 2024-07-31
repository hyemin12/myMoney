import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

import { ReportIcon, EditIcon, TrashIcon } from '@/assets/icons';
import { Icon, Modal } from '@/shared/components';
import { useReport } from '@/features/report';
import { Like, useLike } from '@/features/like';
import { IReviewDetail } from '@/models/review.model';
import { useReviewDetail } from '@/hooks/useReviewDetail';
import { formatDate } from '@/shared/utils/format';
import useAuthStore from '@/store/auth.store';
import { MODAL_TYPES, MODAL_TITLE } from '@/constants/modalString';
import useModal from '@/hooks/useModal';
import {
  Container,
  TitleContainer,
  ReviewInfo,
  Content,
  AuthorContainer,
} from './ReviewContent.style';

export interface Props {
  reviewId?: string;
}

const Stars = React.memo((props: Pick<IReviewDetail, 'stars'>) => {
  return (
    <div className="star">
      {Array.from({ length: 5 }, (_, index) => (
        <AiFillStar
          size={20}
          key={index}
          style={{ color: index < props.stars ? '#ffe600' : '#d9d9d9' }}
        />
      ))}
    </div>
  );
});

interface BtnProps {
  className: string;
  icon: React.ReactElement;
  label?: string;
  onClick: () => void;
}

const Btn = ({ className, icon, label, onClick }: BtnProps) => {
  return (
    <div className={className} role="button" onClick={onClick}>
      <Icon width={20} height={20} icon={icon} />
      {label}
    </div>
  );
};

function ReviewContent() {
  const { id } = useParams();
  if (!id) return;

  const NumberReviewId = Number(id);
  const { review, deleteReviewHandler } = useReviewDetail(NumberReviewId);

  if (!review) return null;

  const navigate = useNavigate();
  const { postReport } = useReport();
  const { isLoggedIn } = useAuthStore();
  const { likeToggle, localIsLiked, localLikes } = useLike({
    reviewId: NumberReviewId,
    isLikedDB: review?.isLiked ?? false,
    likesDB: review?.likes ?? 0,
  });

  const { openModal, modalProps } = useModal({
    onConfirm: (option: string) => {
      if (modalProps.title === MODAL_TITLE.REVIEW_DELETE) {
        deleteReviewHandler();
      }
      if (modalProps.title === MODAL_TITLE.REPORT) {
        postReport({ reason: option, reportedUserId: review.userId });
      }
      if (modalProps.title === MODAL_TITLE.LOGIN) {
        navigate(`/login`);
      }
    },
  });

  const handleUpdate = () => {
    if (!isLoggedIn) {
      openModal(MODAL_TYPES.LOGIN);
    } else {
      navigate(`/review/${id}`);
    }
  };

  const handleDelete = () => {
    if (!isLoggedIn) {
      openModal(MODAL_TYPES.LOGIN);
    } else {
      openModal(MODAL_TYPES.DELETE);
    }
  };

  const handleReport = () => {
    if (!isLoggedIn) {
      openModal(MODAL_TYPES.LOGIN);
    } else {
      openModal(MODAL_TYPES.REPORT);
    }
  };

  return (
    <Container>
      <AuthorContainer>
        <h3 className="nickname">{review.name}</h3>
        {review.isAuthor ? (
          <div className="btn">
            <Btn
              className="update"
              icon={<EditIcon />}
              onClick={handleUpdate}
            />
            <Btn
              className="delete"
              icon={<TrashIcon />}
              onClick={handleDelete}
            />
          </div>
        ) : (
          <Btn
            className="report btn"
            icon={<ReportIcon />}
            onClick={handleReport}
          />
        )}
      </AuthorContainer>

      <Modal {...modalProps} />

      <TitleContainer>
        <h2 className="title">{review.title}</h2>
      </TitleContainer>

      <ReviewInfo>
        <Link to={`/list?categoryId=${review.categoryId}`}>
          {review.categoryName}
        </Link>
        <span>{formatDate(review.createdAt)}</span>
      </ReviewInfo>

      <Stars stars={review.stars} />

      <Content dangerouslySetInnerHTML={{ __html: review.content }}></Content>

      <Like isLiked={localIsLiked} likes={localLikes} onClick={likeToggle} />
    </Container>
  );
}

export default ReviewContent;
