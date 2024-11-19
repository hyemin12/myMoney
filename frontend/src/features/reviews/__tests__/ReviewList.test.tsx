import { screen, render, within } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ReviewList, {
  IReviewListProps,
} from '../components/ReviewList/ReviewList';
import { theme } from '@/styles/theme';
import { MemoryRouter } from 'react-router-dom';
import { formatDate } from '@/shared/utils';

const mockData = [
  {
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
  },
  {
    id: 2,
    title: '두 번째 리뷰',
    createdAt: '2024-08-22T09:21:34Z',
    userName: '김철수',
    reviewImg: 'http://example.com/image2.jpg',
    content: '<p>좋은 품질이에요, 추천합니다!</p>',
    verified: false,
    likes: 5,
    userId: 102,
    isMyReview: false,
    isLiked: true,
  },
  {
    id: 3,
    title: '세 번째 리뷰',
    createdAt: '2024-08-21T15:43:12Z',
    userName: '이영희',
    reviewImg: 'http://example.com/image3.jpg',
    content: '<p>가격 대비 만족스럽습니다.</p>',
    verified: true,
    likes: 20,
    userId: 103,
    isMyReview: false,
    isLiked: false,
  },
];

jest.mock('@/shared/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: () => ({ observerRef: jest.fn() }),
}));

jest.mock('@/features/like/hooks/useLike', () => ({
  useLike: jest.fn(() => ({
    likeToggle: jest.fn(),
    localIsLiked: false,
    localLikes: 0,
  })),
}));

describe('ReviewList 컴포넌트 테스트', () => {
  const setup = ({
    title = undefined,
    reviews = mockData,
    text = '검색한',
    isLoading = false,
    hasNextPage = false,
  }: Partial<IReviewListProps>) => {
    return render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ReviewList
            reviews={reviews}
            text={text}
            title={title}
            fetchNextPage={jest.fn()}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
          />
        </ThemeProvider>
      </MemoryRouter>,
    );
  };

  test('올바르게 렌더링되는지 확인', () => {
    setup({ title: '테스트용 리뷰 목록 타이틀' });

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      '테스트용 리뷰 목록 타이틀',
    );

    mockData.forEach((review) => {
      const item = screen.getByText(review.userName).closest('article');
      expect(item).toBeInTheDocument();

      const utils = within(item!);
      expect(utils.getByText(review.userName)).toBeInTheDocument();
      expect(utils.getByText(review.title)).toBeInTheDocument();
      expect(utils.getByText(review.title).closest('a')).toHaveAttribute(
        'href',
        `/list/${review.id}`,
      );
      expect(utils.getByText(formatDate(review.createdAt))).toBeInTheDocument();

      if (review.verified) {
        expect(utils.getByText('인증된 후기')).toBeInTheDocument();
      }
    });
  });

  test('타이틀이 전달되지 않을 때 타이틀이 렌더링 되는 않는 것을 확인', () => {
    setup({});

    expect(
      screen.queryByText('테스트용 리뷰 목록 타이틀'),
    ).not.toBeInTheDocument();
  });

  test('로딩 상태일 때 로딩 컴포넌트가 렌더링 되는지 확인', () => {
    setup({ isLoading: true });

    expect(screen.getByTestId('loading-container')).toBeInTheDocument();
  });

  test('리뷰가 없을 때 리뷰가 없습니다. 문구가 렌더링 되는지 확인', () => {
    setup({ reviews: [] });
    expect(screen.getByText('검색한 리뷰가 없습니다.'));
  });

  test('리뷰가 없을 때 ReactNode 타입의 prop이 렌더링 되는지 확인', () => {
    setup({
      reviews: [],
      text: <p data-testid="reactNode">ReactNode 타입의 Prop</p>,
    });

    expect(screen.getByTestId('reactNode')).toHaveTextContent(
      'ReactNode 타입의 Prop',
    );
  });

  test('다음 페이지가 있을 때 무한스크롤을 위한 옵저버 요소가 렌더링 되는지 확인', () => {
    setup({ hasNextPage: true });

    expect(screen.getByTestId('observer-ref')).toBeInTheDocument();
  });
});
