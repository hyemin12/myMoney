import { Button } from '@/shared/components';
import { IFormatSuspendedUsers } from '../models/admin.model';
import { formatDate } from '@/shared/utils';
import styled from 'styled-components';
import { calcIndex } from '../utils/calcTableIndex';

interface Props {
  approveReport: (reviewId: number) => void;
  cancelReport: (reviewId: number) => void;
  suspendedUsers: IFormatSuspendedUsers[];
  currentPage: number;
}

function AdminReportTableBody({
  cancelReport,
  approveReport,
  suspendedUsers,
  currentPage,
}: Props) {
  return (
    <>
      {suspendedUsers.map((report, idx) => (
        <tr key={report.reportId}>
          <td>{calcIndex(currentPage, idx)}</td>
          <td>{report.reporterUserEmail}</td>
          <td>{report.reportReason}</td>
          <td>{report.reportedUserEmail}</td>
          <td>{formatDate(report.reportedAt)}</td>
          <td>{report.status}</td>
          <td>
            {report.result === '처리 완료' ? formatDate(report.handledAt) : ''}
          </td>
          <TdButtonGroup className="td-button-group">
            {report.result === '처리 완료' ? (
              <Button disabled size="small" scheme="disabled">
                완료
              </Button>
            ) : (
              <>
                <Button
                  scheme="border"
                  size="small"
                  onClick={() => cancelReport(report.reportId)}
                >
                  취소
                </Button>
                <Button
                  scheme="primary"
                  size="small"
                  onClick={() => approveReport(report.reportId)}
                >
                  승인
                </Button>
              </>
            )}
          </TdButtonGroup>
        </tr>
      ))}
    </>
  );
}

const TdButtonGroup = styled.td`
  display: flex;
  gap: 6px;
  justify-content: center;
  button {
    flex-shrink: 0;
    margin: 0 !important;
  }
`;

export default AdminReportTableBody;
