import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ReviewItem from '../components/ReviewList/ReviewItem';
import { useLike } from '@/features/like';
import { theme } from '@/styles/theme';

const mockData = {
  id: 1,
  title: '첫 번째 리뷰',
  createdAt: '2024-08-23T12:34:56Z',
  userName: '홍길동',
  reviewImg: 'http://example.com/image1.jpg',
  content: '<p>이 제품은 정말 좋습니다!</p>',
  verified: true,
  likes: 15,
  userId: 101,
  isMyReview: true,
  isLiked: false,
};

jest.mock('@/features/like/hooks/useLike', () => ({
  useLike: jest.fn(),
}));

describe('ReviewItem 컴포넌트 테스트', () => {
  const mockLikeToggle = jest.fn();

  beforeEach(() => {
    (useLike as jest.Mock).mockReturnValue({
      likeToggle: mockLikeToggle,
      localIsLiked: mockData.isLiked,
      localLikes: mockData.likes,
    });
  });

  const setup = (verified: boolean = true) => {
    return render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ReviewItem {...mockData} verified={verified} />
        </ThemeProvider>
      </MemoryRouter>,
    );
  };

  test('올바르게 렌더링 되는지 확인', () => {
    setup();

    expect(screen.getByText(mockData.userName)).toBeInTheDocument();
    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(mockData.title).closest('a')).toHaveAttribute(
      'href',
      `/list/${mockData.id}`,
    );
    expect(screen.getByText('이 제품은 정말 좋습니다!')).toBeInTheDocument();
    expect(screen.getByAltText(mockData.title)).toHaveAttribute(
      'src',
      mockData.reviewImg,
    );
    expect(screen.getByAltText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText('인증된 후기')).toBeInTheDocument();
  });

  test('인증된 후기에만 인증 배지가 렌더링 되는지 확인', () => {
    setup();
    expect(screen.getByText('인증된 후기')).toBeInTheDocument();
  });

  test('인증되지 않은 후기에는 인증 배지가 렌더링 되지 않는 것을 확인', () => {
    setup(false);
    expect(screen.queryByText('인증된 후기')).not.toBeInTheDocument();
  });
});
