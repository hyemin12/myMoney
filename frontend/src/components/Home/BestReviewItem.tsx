import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Star, LightStar } from '@/assets/icons';
import { Badge } from '@/components/common';

interface Props {
  id: number;
  img?: string;
  isVerified?: number;
  title?: string;
  userName?: string;
  stars?: number;
  page?: string;
}

function BestReview({
  id,
  img,
  isVerified,
  title,
  userName,
  stars = 0,
  page,
}: Props) {
  return (
    <BestReviewStyle>
      <div className="wrapTop">
        <div className="badge">
          {isVerified ? (
            <Badge verifiedIcon text="인증된 후기" type="fill" position="top" />
          ) : null}
        </div>
      </div>
      <div className="imgwrap">
        <img className="img" src={img} />
      </div>

      <div className="wrapBottom">
        <StyledLink to={`/reviews/${id}`}>
          <div className="title">{title}</div>
        </StyledLink>
        <div className="userName">{userName}</div>
        <div className="wrapFlex">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((e, index) =>
              e <= stars ? (
                <LightStar key={`light-star-${index}`} />
              ) : (
                <Star key={`star-${index}`} />
              ),
            )}
          </div>
          {page}
        </div>
      </div>
    </BestReviewStyle>
  );
}

const BestReviewStyle = styled.div`
  width: 390px;
  height: 350px;
  border-radius: 6px;
  overflow: hidden;
  .imgwrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  .img {
    width: 100%;
    object-fit: cover;
  }

  .wrapTop {
    position: absolute;
    z-index: 15;
    width: 100%;
    height: 50px;

    .badge {
      display: flex;
      border-top-left-radius: 6px;
      gap: 6px;
    }
  }

  .wrapBottom {
    padding: 40px 20px 0px 20px;
    color: white;
    position: relative;
    z-index: 15;
    width: 100%;
    background-image: linear-gradient(to top, #454545, rgba(255, 255, 255, 0));
    height: 150px;
    bottom: 150px;
  }

  .title {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.heading.large.fontSize};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .userName {
    font-size: ${({ theme }) => theme.text.medium.fontSize};
  }

  .wrapFlex {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .stars {
      display: flex;
    }
  }
`;

const BadgeStyle = styled(Badge)`
  width: 75px;
  height: 25px;
  background-color: ${({ theme }) => theme.color.primary};
  color: white;
  font-size: 15px;

  .badgeImg {
    height: 22px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default BestReview;