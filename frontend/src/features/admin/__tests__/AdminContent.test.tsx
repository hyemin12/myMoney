import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import AdminContent from '../components/AdminContent';
import { theme } from '@/styles/theme';
import { MemoryRouter } from 'react-router-dom';

const TOTAL_PAGE = 3;

describe('AdminContent 컴포넌트 테스트', () => {
  const setup = (isLoading: boolean = false) => {
    render(
      <MemoryRouter initialEntries={['?page=1']}>
        <ThemeProvider theme={theme}>
          <AdminContent
            title="테스트용 콘텐츠"
            isLoading={isLoading}
            totalPage={TOTAL_PAGE}
          >
            <div data-testid="admin-content">콘텐츠</div>
          </AdminContent>
        </ThemeProvider>
      </MemoryRouter>,
    );
  };

  test('올바르게 렌더링 되는지 확인', () => {
    setup();

    expect(screen.getByText('테스트용 콘텐츠')).toBeInTheDocument();
    expect(screen.getByTestId('admin-content')).toBeInTheDocument();

    const paginationButtons = screen.getAllByRole('button');
    expect(paginationButtons.length).toBe(TOTAL_PAGE);
    expect(paginationButtons[0]).toHaveClass('active');
  });

  test('로딩상태일 경우 로딩 컴포넌트가 렌더링 되는지 확인', () => {
    setup(true);

    expect(screen.getByTestId('loading-container')).toBeInTheDocument();
    expect(screen.queryByText('콘텐츠')).not.toBeInTheDocument();
  });
});
