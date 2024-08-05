import { Button } from '@/shared/components';
import { IFormatSuspendedUsers } from '../model/admin.model';
import { formatDate } from '@/shared/utils';
import styled from 'styled-components';

interface Props {
  approveReport: (reviewId: number) => void;
  cancelReport: (reviewId: number) => void;
  suspendedUsers: IFormatSuspendedUsers[];
}

function AdminReportTableBody({
  cancelReport,
  approveReport,
  suspendedUsers,
}: Props) {
  return (
    <>
      {suspendedUsers.map((report, idx) => (
        <tr key={report.reportId}>
          <td>{idx + 1}</td>
          <td>{report.reporterUserEmail}</td>
          <td>{report.reportReason}</td>
          <td>{report.reportedUserEmail}</td>
          <td>{formatDate(report.reportedAt)}</td>
          <td>{report.status}</td>
          <td>{report.handledAt ? formatDate(report.handledAt) : ''}</td>
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
    margin: 0 !important;
  }
`;

export default AdminReportTableBody;
