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

import CheckImg from '@/assets/images/logo32x32.png';
import CategoryButton from './CategoryButton';
import { ICategoryItem } from '@/models/category.model';
import Loading from './Loading';
import { useCategory } from '@/hooks/useCategory';
import { LoadingContainer } from '../Admin/AdminContent';

const assetMap = {
  디지털: <CategoryDevicesIcon />,
  의류: <CategoryTShirtIcon />,
  '가구/인테리어': <CategoryArmchairIcon />,
  가전: <CategoryOvenIcon />,
  문화: <CategoryFilmSlateIcon />,
  식품: <CategoryHamburgerIcon />,
  '뷰티/미용': <CategoryHairDryerIcon />,
  장소: <CategoryMapPinIcon />,
  기타: <DotsThreeIcon />,
  인증: CheckImg,
};

function Category() {
  const { categoryList, isLoading } = useCategory();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  const categories: ICategoryItem[] = categoryList.map(
    (category: { id: number; name: string }) => ({
      categoryId: category.id,
      categoryName: category.name,
      element: assetMap[category.name as keyof typeof assetMap],
    }),
  );

  return (
    <CategoryStyle>
      <div className="items">
        {categories.map((category) => (
          <CategoryButton
            key={category.categoryId}
            {...category}
            isActive={parseInt(categoryId!) === category.categoryId}
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
