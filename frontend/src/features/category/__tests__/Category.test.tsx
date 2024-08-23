import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { useCategory } from '../hooks/useCategory';
import Category from '../components/Category';

jest.mock('../hooks/useCategory', () => ({
  useCategory: jest.fn(),
}));

const mockData = [
  { id: 1, name: '디지털' },
  { id: 2, name: '의류' },
  { id: 3, name: '가구/인테리어' },
  { id: 4, name: '가전' },
  { id: 5, name: '문화' },
  { id: 6, name: '식품' },
  { id: 7, name: '뷰티/미용' },
  { id: 8, name: '장소' },
  { id: 9, name: '기타' },
  { id: 10, name: '인증' },
];

describe('Category 컴포넌트 테스트', () => {
  const setup = () => {
    render(
      <MemoryRouter initialEntries={['?categoryId=1']}>
        <ThemeProvider theme={theme}>
          <Category />
        </ThemeProvider>
      </MemoryRouter>,
    );
  };

  test('올바르게 렌더링되는지 확인', () => {
    (useCategory as jest.Mock).mockReturnValue({
      categoryList: mockData,
      isLoading: false,
    });

    setup();

    mockData.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  test('카테고리의 아이디가 일치하는 경우 활성화 카테고리 스타일이 적용되는지 확인', () => {
    (useCategory as jest.Mock).mockReturnValue({
      categoryList: mockData,
      isLoading: false,
    });

    setup();

    const activeCategory = screen.getByText('디지털');
    expect(activeCategory).not.toHaveStyle('background-color: #f1f1f1');
  });

  test('로딩 중일 때 로딩 컴포넌트가 렌더링 되는지 확인', () => {
    (useCategory as jest.Mock).mockReturnValue({
      categoryList: [],
      isLoading: true,
    });

    setup();

    expect(screen.getByTestId('loading-container')).toBeInTheDocument();
  });
});
