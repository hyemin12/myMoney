import { screen, render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import AdminReportTableBody from '../components/AdminReportTableBody';
import { IFormatSuspendedUsers } from '../models/admin.model';
import { theme } from '@/styles/theme';

const mockData: IFormatSuspendedUsers[] = [
  {
    reportId: 1,
    reporterUserEmail: 'reporter1@example.com',
    reportedUserEmail: 'reported1@example.com',
    reportCount: 3,
    reportReason: '같은 내용 반복 작성(도배)',
    reportedAt: '2024-08-15T14:22:30Z',
    isFalseReport: false,
    handledAt: '2024-08-16T09:00:00Z',
    result: '처리 완료',
    status: '승인',
  },
  {
    reportId: 2,
    reporterUserEmail: 'reporter2@example.com',
    reportedUserEmail: 'reported2@example.com',
    reportCount: 1,
    reportReason: '욕설/인신공격',
    reportedAt: '2024-08-17T10:15:45Z',
    isFalseReport: true,
    handledAt: '2024-08-19',
    result: '처리 완료',
    status: '허위 신고',
  },
  {
    reportId: 3,
    reporterUserEmail: 'reporter3@example.com',
    reportedUserEmail: 'reported3@example.com',
    reportCount: 2,
    reportReason: '영리목적/홍보성',
    reportedAt: '2024-08-18T12:00:00Z',
    isFalseReport: false,
    handledAt: '',
    result: null,
    status: '대기',
  },
];

describe('AdminReportTableBody 컴포넌트 테스트', () => {
  const mockCancelReport = jest.fn();
  const mockApproveReport = jest.fn();

  const setup = (suspendedUsers: IFormatSuspendedUsers[] = mockData) => {
    render(
      <ThemeProvider theme={theme}>
        <table>
          <tbody>
            <AdminReportTableBody
              cancelReport={mockCancelReport}
              approveReport={mockApproveReport}
              suspendedUsers={suspendedUsers}
              currentPage={1}
            />
          </tbody>
        </table>
      </ThemeProvider>,
    );
  };

  test('올바르게 렌더링 되는지 확인', () => {
    setup();

    expect(screen.getByText('reporter1@example.com')).toBeInTheDocument();
    expect(screen.getByText('같은 내용 반복 작성(도배)')).toBeInTheDocument();
    expect(screen.getByText('reported1@example.com')).toBeInTheDocument();
    expect(screen.getByText('2024.08.15')).toBeInTheDocument();

    expect(screen.getByText('reporter2@example.com')).toBeInTheDocument();
    expect(screen.getByText('욕설/인신공격')).toBeInTheDocument();
    expect(screen.getByText('reported2@example.com')).toBeInTheDocument();
    expect(screen.getByText('2024.08.17')).toBeInTheDocument();

    expect(screen.getByText('reporter3@example.com')).toBeInTheDocument();
    expect(screen.getByText('영리목적/홍보성')).toBeInTheDocument();
    expect(screen.getByText('reported3@example.com')).toBeInTheDocument();
    expect(screen.getByText('2024.08.18')).toBeInTheDocument();
  });

  test('결과(null)에 따라 적절한 버튼이 표시되는지 확인', () => {
    setup([mockData[2]]);

    const buttonElements = screen.getAllByRole('button');
    expect(buttonElements[0]).toHaveTextContent('취소');
    expect(buttonElements[1]).toHaveTextContent('승인');
  });

  test('결과(처리 완료)에 따라 적절한 버튼이 표시되는지 확인', () => {
    setup([mockData[1]]);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('완료');
    expect(buttonElement).toBeDisabled();
  });

  test('신고처리 기능과 허위신고(신고내역 삭제) 기능이 올바르게 작동하는지 확인', () => {
    setup([mockData[2]]);

    fireEvent.click(screen.getAllByText('승인')[0]);
    expect(mockApproveReport).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getAllByText('취소')[0]);
    expect(mockCancelReport).toHaveBeenCalledWith(3);
  });
});
