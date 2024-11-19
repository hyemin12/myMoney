import BadgeImg from '@/assets/images/badge-img.png';
import styled, { css } from 'styled-components';

interface BadgeProps {
  type: 'border' | 'fill';
  verifiedIcon?: boolean;
  text: string;
  $position: 'top' | 'bottom';
}

function Badge({ type, text, verifiedIcon = false, $position }: BadgeProps) {
  return (
    <BadgeStyle type={type} className="badge" $position={$position}>
      {verifiedIcon && (
        <img className="badgeImg" src={BadgeImg} alt="인증마크" />
      )}
      {text}
    </BadgeStyle>
  );
}
const BadgeStyle = styled.div<Pick<BadgeProps, 'type' | '$position'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 4px;
  padding: 6px 14px;
  font-size: 14px;
  box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.05);

  ${({ type, theme }) =>
    type === 'border' &&
    css`
      background-color: #fff;
      border: 1px solid ${theme.color.primary};
      color: ${theme.color.primary};
    `}

  ${({ type, theme }) =>
    type === 'fill' &&
    css`
      background-color: ${theme.color.primary};
      color: #fff;
    `}

  .badgeImg {
    height: 14px;
  }

  ${({ $position }) =>
    $position === 'top' &&
    css`
      border-top-left-radius: 6px;
    `}

  ${({ $position }) =>
    $position === 'bottom' &&
    css`
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom-left-radius: 6px;
    `}
`;

export default Badge;
