import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';
import { ICategoryItem } from '@/models/category.model';

interface CategoryButtonProps extends ICategoryItem {
  isActive: boolean;
}

function CategoryButton({
  categoryId,
  element,
  categoryName,
  isActive,
}: CategoryButtonProps) {
  return (
    <CategoryButtonStyle className="item" key={categoryId} isActive={isActive}>
      <StyledLink
        to={{
          pathname: '/list',
          search:
            categoryId != 10 ? `?categoryId=${categoryId}` : `?isVerified=true`,
        }}
      >
        <Button
          key={categoryId}
          children={
            React.isValidElement(element) ? (
              element
            ) : (
              <img src={element as string} alt={categoryName} />
            )
          }
          size={'small'}
          scheme={'disabled'}
        />
        <p>{categoryName}</p>
      </StyledLink>
    </CategoryButtonStyle>
  );
}

const CategoryButtonStyle = styled.div<{ isActive: boolean }>`
  grid-column: span 1;
  display: flex;
  justify-content: center;

  p {
    font-size: 12px;
    max-width: 55px;
    white-space: nowrap;
    overflow: visible;
    display: flex;
    justify-content: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
    margin-bottom: 4px;
  }

  // isActive가 true일 때만 적용할 스타일
  ${({ isActive, theme }) =>
    isActive &&
    `
    button {
      background-color: ${theme.color.primary};
      svg {
        fill: #eee;
        path {
          fill: inherit;
        }
      }
    }
    p {
      color: ${theme.color.primary};
    }`}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default CategoryButton;
