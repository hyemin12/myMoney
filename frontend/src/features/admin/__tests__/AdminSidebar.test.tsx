import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AdminSidebar from '../../../layout/admin/AdminSidebar';
import { theme } from '@/styles/theme';

// 네비게이션 섹션의 제목(사이트관리)이 제대로 표시되는지
describe('AdminSidebar 컴포넌트 테스트', () => {
  const setup = (path: string = '/admin/users') => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <ThemeProvider theme={theme}>
          <AdminSidebar />
        </ThemeProvider>
      </MemoryRouter>,
    );

    return {
      LogoElement: container.querySelector('.service-logo'),
      moveToSiteNavItem: screen.getByText('사이트 바로가기').closest('a'),
      userManagementNavItem: screen.getByText('사용자 관리').closest('a'),
      reportManagementNavItem: screen
        .getByText('신고된 사용자 관리')
        .closest('a'),
      unverifiedReviewsNavItem: screen
        .getByText('미승인 후기 관리')
        .closest('a'),
    };
  };

  test('아이템이 올바르게 렌더링 되는지 확인', () => {
    const {
      LogoElement,
      moveToSiteNavItem,
      userManagementNavItem,
      reportManagementNavItem,
      unverifiedReviewsNavItem,
    } = setup();

    expect(LogoElement).toBeInTheDocument();
    expect(moveToSiteNavItem).toBeInTheDocument();
    expect(userManagementNavItem).toBeInTheDocument();
    expect(reportManagementNavItem).toBeInTheDocument();
    expect(unverifiedReviewsNavItem).toBeInTheDocument();
  });

  test('아이템 링크가 올바른 경로로 설정되어있는지 확인', () => {
    const {
      moveToSiteNavItem,
      userManagementNavItem,
      reportManagementNavItem,
      unverifiedReviewsNavItem,
    } = setup();

    expect(moveToSiteNavItem).toHaveAttribute('href', '/');
    expect(userManagementNavItem).toHaveAttribute('href', '/admin/users');
    expect(reportManagementNavItem).toHaveAttribute(
      'href',
      '/admin/report-user',
    );
    expect(unverifiedReviewsNavItem).toHaveAttribute(
      'href',
      '/admin/unverified-reviews',
    );
  });

  test('각 네비게이션 아이템이 활성화 상태인지 확인', () => {
    const { userManagementNavItem } = setup();
    expect(userManagementNavItem).toHaveClass('active');
  });
});
