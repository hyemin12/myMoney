import { Button } from '@/shared/components';
import { IFormatSuspendedUsers } from '../model/admin.model';

interface Props {
  handleDeleteReport: (reportId: number) => void;
  suspendedUsers: IFormatSuspendedUsers[];
}

function AdminReportTableBody({ handleDeleteReport, suspendedUsers }: Props) {
  return (
    <>
      {suspendedUsers.map((report, idx) => (
        <tr key={report.reportId}>
          <td>{idx + 1}</td>
          <td>{report.reportedUserEmail}</td>
          <td>{report.reportReason}</td>
          <td>{report.reportCount}</td>
          <td>{report.status}</td>
          <td>
            <Button
              scheme="primary"
              size="small"
              disabled={report.status === '정지 종료'}
              onClick={() => handleDeleteReport(report.reportId)}
            >
              정지해제
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default AdminReportTableBody;
