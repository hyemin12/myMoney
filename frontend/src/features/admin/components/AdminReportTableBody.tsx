import styled from 'styled-components';

import { IFormatSuspendedUsers } from '../models/admin.model';
import { formatDate } from '@/shared/utils';
import { calcIndex } from '../utils/calcTableIndex';
import getReportActionButtons from '../utils/getReportActionButtons';

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
          <td data-testid="report-reporterEmail">{report.reporterUserEmail}</td>
          <td data-testid="report-reportReason">{report.reportReason}</td>
          <td data-testid="report-reportedEmail">{report.reportedUserEmail}</td>
          <td data-testid="report-reportedAt">
            {formatDate(report.reportedAt)}
          </td>
          <td data-testid="report-status">{report.status}</td>
          <td data-testid="report-handledAt">
            {report.result === '처리 완료' ? formatDate(report.handledAt) : ''}
          </td>

          <TdButtonGroup className="td-button-group">
            {getReportActionButtons({
              result: report.result,
              reportId: report.reportId,
              cancelReport,
              approveReport,
            })}
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
