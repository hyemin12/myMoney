import { screen, render, fireEvent, within } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import AdminReportTableBody from '../components/AdminReportTableBody';
import { IFormatSuspendedUsers } from '../models/admin.model';
import { theme } from '@/styles/theme';
import { formatDate } from '@/shared/utils';

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

    mockData.forEach((report) => {
      const row = screen.getByText(report.reporterUserEmail).closest('tr');
      expect(row).toBeInTheDocument();

      const utils = within(row!);
      expect(utils.getByTestId('report-reporterEmail')).toHaveTextContent(
        report.reporterUserEmail,
      );
      expect(utils.getByTestId('report-reportedEmail')).toHaveTextContent(
        report.reportedUserEmail,
      );
      expect(utils.getByTestId('report-reportReason')).toHaveTextContent(
        report.reportReason,
      );
      expect(utils.getByTestId('report-reportedAt')).toHaveTextContent(
        formatDate(report.reportedAt),
      );
      expect(utils.getByTestId('report-handledAt')).toHaveTextContent(
        report.handledAt ? formatDate(report.handledAt) : '',
      );
      expect(utils.getByTestId('report-status')).toHaveTextContent(
        report.status,
      );

      if (report.result === '처리 완료') {
        const buttonElement = utils.getByRole('button', { name: '완료' });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeDisabled();
      } else {
        const buttonElements = utils.getAllByRole('button');
        expect(buttonElements[0]).toHaveTextContent('취소');
        expect(buttonElements[1]).toHaveTextContent('승인');
      }
    });
  });

  test('신고처리 기능과 허위신고(신고내역 삭제) 기능이 올바르게 작동하는지 확인', () => {
    setup([mockData[2]]);

    fireEvent.click(screen.getAllByText('승인')[0]);
    expect(mockApproveReport).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getAllByText('취소')[0]);
    expect(mockCancelReport).toHaveBeenCalledWith(3);
  });
});
