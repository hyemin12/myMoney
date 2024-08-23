import { theme } from '@/styles/theme';
import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import AdminUserManagementTableBody from '../components/AdminUserManagementTableBody';
import { IFullUser } from '@/features/auth';
import { formatDate } from '@/shared/utils';

const mockData: IFullUser[] = [
  {
    id: 1,
    email: 'user1@example.com',
    nickname: 'UserOne',
    isAdmin: false,
    suspensionCount: 0,
    status: '이용',
    banEndDate: null,
  },
  {
    id: 2,
    email: 'user2@example.com',
    nickname: 'UserTwo',
    isAdmin: false,
    suspensionCount: 1,
    status: '정지',
    banEndDate: '2024-09-01',
  },
  {
    id: 3,
    email: 'admin@example.com',
    nickname: 'AdminUser',
    isAdmin: true,
    suspensionCount: 0,
    status: '이용',
    banEndDate: null,
  },
  {
    id: 4,
    email: 'user4@example.com',
    nickname: 'UserFour',
    isAdmin: false,
    suspensionCount: 3,
    status: '정지',
    banEndDate: '2024-08-30',
  },
  {
    id: 5,
    email: 'user5@example.com',
    nickname: 'UserFive',
    isAdmin: false,
    suspensionCount: 0,
    status: '탈퇴',
    banEndDate: null,
  },
];

describe('AdminUserManagementTableBody 컴포넌트 테스트', () => {
  test('올바르게 렌더링 되는지 확인', () => {
    render(
      <ThemeProvider theme={theme}>
        <table>
          <tbody>
            <AdminUserManagementTableBody currentPage={1} allUsers={mockData} />
          </tbody>
        </table>
      </ThemeProvider>,
    );

    mockData.forEach((user) => {
      const row = screen.getByText(user.email).closest('tr');
      expect(row).toBeInTheDocument();

      // 행 내에서 사용자의 정보가 올바르게 표시되는지 확인
      const utils = within(row!);
      expect(utils.getByTestId('user-email')).toHaveTextContent(user.email);
      expect(utils.getByTestId('user-nickname')).toHaveTextContent(
        user.nickname,
      );
      expect(utils.getByTestId('user-status')).toHaveTextContent(user.status);
      expect(utils.getByTestId('user-id')).toHaveTextContent(String(user.id));
      expect(utils.getByTestId('user-suspensionCount')).toHaveTextContent(
        String(user.suspensionCount),
      );
      expect(utils.getByTestId('user-banEndDate')).toHaveTextContent(
        user.banEndDate ? formatDate(user.banEndDate) : '-',
      );
    });
  });
});
