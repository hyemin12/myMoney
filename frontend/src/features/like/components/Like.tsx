import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { Icon } from '@/components/common';
import { theme } from '@/styles/theme';

interface Props {
  likes: number;
  isLiked: boolean;
  onClick: () => void;
}

function Like({ likes, isLiked, onClick }: Props) {
  return (
    <LikeStyle likesempty={likes <= 0 ? 'empty' : null}>
      {likes > 0 && <p>{likes}명에게 도움이 된 리뷰에요.</p>}

      <LikeButton
        className={isLiked ? 'liked' : ''}
        role="button"
        onClick={onClick}
      >
        {isLiked ? (
          <Icon width={24} icon={<AiFillHeart />} fill={theme.color.danger} />
        ) : (
          <Icon width={24} icon={<AiOutlineHeart />} />
        )}
      </LikeButton>
    </LikeStyle>
  );
}

const LikeStyle = styled.div<{ likesempty: 'empty' | null }>`
  display: flex;
  align-items: center;
  justify-content: ${({ likesempty }) =>
    likesempty === 'empty' ? 'flex-end' : 'space-between'};

  p {
    padding-top: 3px;
    font-size: ${({ theme }) => theme.text.medium.fontSize};
  }
`;
const LikeButton = styled.div`
  cursor: pointer;

  &:hover {
    svg {
      fill: ${({ theme }) => theme.color.danger};
      path {
        fill: inherit;
      }
    }
  }
`;

export default Like;