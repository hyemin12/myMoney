import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import {
  Armchair,
  HairDryer,
  Hamburger,
  MapPin,
  TShirt,
  Devices,
  Oven,
  FilmSlate,
  DotsThree,
} from '@/assets/icons';

import CheckImg from '@/assets/images/logo32x32.png';
import CategoryButton from './CategoryButton';
import { ICategoryItem } from '@/models/category.model';
import Loading from './Loading';
import { useCategory } from '@/hooks/useCategory';
import { LoadingContainer } from '../Admin/AdminContent';

const assetMap = {
  디지털: <Devices />,
  의류: <TShirt />,
  '가구/인테리어': <Armchair />,
  가전: <Oven />,
  문화: <FilmSlate />,
  식품: <Hamburger />,
  '뷰티/미용': <HairDryer />,
  장소: <MapPin />,
  기타: <DotsThree />,
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
