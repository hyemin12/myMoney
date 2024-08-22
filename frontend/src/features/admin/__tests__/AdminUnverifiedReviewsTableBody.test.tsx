import { screen, render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import AdminUnverifiedReviewsTableBody from '../components/AdminUnverifiedReviewsTableBody';
import { theme } from '@/styles/theme';

const mockUnverifiedReviews = [
  {
    id: 1,
    title: 'Test Review 1',
    userName: 'User1',
    userId: 101,
    createdAt: '2023-08-21T12:34:56Z',
    receiptImg: 'receipt1.jpg',
  },
  {
    id: 2,
    title: 'Test Review 2',
    userName: 'User2',
    userId: 102,
    createdAt: '2023-08-20T11:22:33Z',
    receiptImg: 'receipt2.jpg',
  },
];

// 아이콘 클릭 시 함수 호출
describe('AdminUnverifiedReviewsTableBody 컴포넌트 테스트', () => {
  const mockOnApproveReview = jest.fn();
  const setup = () => {
    render(
      <ThemeProvider theme={theme}>
        <table>
          <tbody>
            <AdminUnverifiedReviewsTableBody
              unverifiedReviews={mockUnverifiedReviews}
              handleApproveReview={mockOnApproveReview}
              currentPage={1}
            />
          </tbody>
        </table>
      </ThemeProvider>,
    );
  };

  test('올바르게 렌더링 되는지 확인', () => {
    setup();

    expect(screen.getByText('Test Review 1')).toBeInTheDocument();
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('2023-08-21')).toBeInTheDocument();

    expect(screen.getByText('Test Review 2')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(screen.getByText('2023-08-20')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(mockUnverifiedReviews.length);
  });

  test('영수증 인증처리 버튼이 올바르게 작동하는지 확인', () => {
    setup();

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);
    expect(mockOnApproveReview).toHaveBeenCalledWith(
      mockUnverifiedReviews[0].id,
      mockUnverifiedReviews[0].receiptImg,
    );

    fireEvent.click(buttons[1]);
    expect(mockOnApproveReview).toHaveBeenCalledWith(
      mockUnverifiedReviews[1].id,
      mockUnverifiedReviews[1].receiptImg,
    );
  });
});
