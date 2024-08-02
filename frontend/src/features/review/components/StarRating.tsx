import styled from 'styled-components';

import { StarFilledIcon } from '@/assets/icons';
import { Icon } from '@/shared/components';
import { theme } from '@/styles/theme';
import { UseFormSetValue } from 'react-hook-form';
import { IReview } from '../model/review.model';

interface Props {
  ratingIndex: number;
  $size: number;
  setValue: UseFormSetValue<IReview>;
}

function StatRating({ ratingIndex, setValue, $size }: Props) {
  const ArrayIndexes = Array(5).fill(0);

  return (
    <RatingContainer>
      {ArrayIndexes.map((_, idx) => (
        <span
          key={idx}
          onClick={() => (setValue ? setValue('stars', idx + 1) : null)}
        >
          <Icon
            width={$size}
            icon={<StarFilledIcon />}
            fill={idx <= ratingIndex ? '#ffe600' : theme.color.disabled}
          />
        </span>
      ))}
    </RatingContainer>
  );
}

export default StatRating;

const RatingContainer = styled.div`
  display: flex;
  text-align: center;
  margin: 12px 0px;
`;
