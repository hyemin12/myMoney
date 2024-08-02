import { UseFormWatch } from 'react-hook-form';
import styled from 'styled-components';

import { CaretDownIcon } from '@/assets/icons';
import { Dropdown } from '@/shared/components';
import { TCategoryNames } from '@/features/category';
import { IFormControlProps } from './ReviewForm';
import { IReview } from '../../model/review.model';

interface Props extends IFormControlProps {
  categoryOptions: { id: number; name: TCategoryNames }[];
  watch: UseFormWatch<IReview>;
}

function CategorySelector({ categoryOptions, setValue, watch }: Props) {
  const handleSelectCategory = (id: number) => {
    setValue('categoryId', id);
  };
  const categoryId = watch('categoryId');

  return (
    <CategoryContainer>
      <p>
        {categoryOptions.find((category) => category.id === categoryId)?.name ||
          'Select Category'}
      </p>

      <Dropdown
        toggleButton={<CaretDownIcon />}
        $positionLnR="right"
        $positionValue={-10}
        $positionTopValue={32}
        $width={150}
      >
        <ul>
          {categoryOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelectCategory(option.id!)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </Dropdown>
    </CategoryContainer>
  );
}

export default CategorySelector;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  padding: 0px 8px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  p {
    width: 120px;
    font-size: ${({ theme }) => theme.text.medium.fontSize};
  }

  .toggle {
    display: flex;
  }
`;
