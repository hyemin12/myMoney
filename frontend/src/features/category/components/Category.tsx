import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import {
  CategoryArmchairIcon,
  CategoryHairDryerIcon,
  CategoryHamburgerIcon,
  CategoryMapPinIcon,
  CategoryTShirtIcon,
  CategoryDevicesIcon,
  CategoryOvenIcon,
  CategoryFilmSlateIcon,
  DotsThreeIcon,
} from '@/assets/icons';
import CategoryButton from './CategoryButton';
import { useGetCategory } from '../hooks/useGetCategory';
import { LoadingContainer } from '@/features/admin/components/AdminContent';
import { Loading } from '@/shared/components';
import { ICategoryItem } from '../models/category.model';

const ASSET_MAP = {
  디지털: <CategoryDevicesIcon />,
  의류: <CategoryTShirtIcon />,
  '가구/인테리어': <CategoryArmchairIcon />,
  가전: <CategoryOvenIcon />,
  문화: <CategoryFilmSlateIcon />,
  식품: <CategoryHamburgerIcon />,
  '뷰티/미용': <CategoryHairDryerIcon />,
  장소: <CategoryMapPinIcon />,
  기타: <DotsThreeIcon />,
  인증: './logo32x32.png',
};

function Category() {
  const { data, isLoading } = useGetCategory();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  if (isLoading) {
    return (
      <LoadingContainer data-testid="loading-container">
        <Loading />
      </LoadingContainer>
    );
  }

  const categories: ICategoryItem[] = data.map(
    (category: { id: number; name: string }) => ({
      categoryId: category.id,
      categoryName: category.name,
      element: ASSET_MAP[category.name as keyof typeof ASSET_MAP],
    }),
  );

  return (
    <CategoryStyle>
      <div className="items">
        {categories.map((category) => (
          <CategoryButton
            key={category.categoryId}
            {...category}
            $isActive={parseInt(categoryId!) === category.categoryId}
          />
        ))}
      </div>
    </CategoryStyle>
  );
}

const CategoryStyle = styled.div`
  max-width: 100%;
  max-height: 200px;
  overflow: hidden;
  margin: 20px 0;

  .items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 15px;
    column-gap: 21px;
    padding: 0 14px;
  }
`;

export default Category;
