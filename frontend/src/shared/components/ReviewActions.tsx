import { useNavigate } from 'react-router-dom';

import { EditIcon, TrashIcon, ReportIcon } from '@/assets/icons';
import useAuthStore from '@/store/auth.store';
import { useReviews } from '@/features/reviews';
import Icon from './Icon';
import styled from 'styled-components';
import useModalStore from '@/store/modal.store';

interface Props {
  isAuthor: boolean;
  reviewId: number;
  authorId: number;
  showIconOnly?: boolean;
}

const reviewActionButtons = [
  {
    isAuthor: true,
    icon: <EditIcon />,
    label: '수정하기',
    action: 'update',
  },
  {
    isAuthor: true,
    icon: <TrashIcon />,
    label: '삭제하기',
    action: 'delete',
  },
  {
    isAuthor: false,
    icon: <ReportIcon />,
    label: '신고하기',
    action: 'report',
  },
];

function ReviewActions({
  isAuthor,
  reviewId,
  authorId,
  showIconOnly = false,
}: Props) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { deleteReviewInReviews } = useReviews();
  const { openModal } = useModalStore();

  const handleAction = (action: string) => {
    if (!isLoggedIn) {
      openModal('LOGIN');
    }
    switch (action) {
      case 'update': {
        navigate(`/review/${reviewId}`);
        break;
      }
      case 'delete': {
        deleteReviewInReviews(reviewId);
        break;
      }
      case 'report': {
        openModal('REPORT', { reportedUserId: authorId });
        break;
      }
    }
  };

  return (
    <ul>
      {reviewActionButtons
        .filter((button) => (isAuthor ? button.isAuthor : !button.isAuthor))
        .map((button) => (
          <ActionButtonStyle
            key={button.label}
            onClick={() => handleAction(button.action)}
          >
            <Icon width={20} icon={button.icon} />
            {!showIconOnly && button.label}
          </ActionButtonStyle>
        ))}
    </ul>
  );
}

const ActionButtonStyle = styled.li`
  width: 100%;
  display: flex;
  gap: 4px;
  cursor: pointer;
`;

export default ReviewActions;
