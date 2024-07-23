import { AdminLayout, AdminContent, AdminTable } from '@/components/Admin';
import AdminReportTableBody from '@/components/Admin/AdminReportTableBody';
import { TableHeadItem } from '@/components/Admin/AdminTable';
import { withAdminAuthenticatedUser } from '@/components/hocs';
import { useAdmin } from '@/hooks/useAdmin';
import { ISuspendedUsers, IFormatSuspendedUsers } from '@/models/admin.model';

const tableHead: TableHeadItem[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '이메일', $widthRatio: 36 },
  { name: '신고 사유', $widthRatio: 13 },
  { name: '횟수', $widthRatio: 13 },
  { name: '상태', $widthRatio: 14 },
  { name: '', $widthRatio: 20 },
];

function ReportedUsersDashboard() {
  const { isLoadingSuspendedUsers, suspendedUsers, deleteReportAction } =
    useAdmin();

  const formatSuspendedUsers = (
    users: ISuspendedUsers[],
  ): IFormatSuspendedUsers[] => {
    return users.map((data: ISuspendedUsers) => ({
      ...data,
      status: data.isSuspended ? '정지' : '정지 종료',
    }));
  };

  const handleDeleteReport = (reportId: number) => {
    deleteReportAction(reportId);
  };

  return (
    <AdminLayout>
      <AdminContent
        title="신고된 유저 관리"
        isLoading={isLoadingSuspendedUsers}
      >
        {suspendedUsers.length === 0 && (
          <tr>
            <td colSpan={tableHead.length}>신고된 유저가 없습니다.</td>
          </tr>
        )}

        {suspendedUsers.length > 0 && (
          <AdminTable tableHead={tableHead}>
            <AdminReportTableBody
              suspendedUsers={formatSuspendedUsers(suspendedUsers)}
              handleDeleteReport={handleDeleteReport}
            />
          </AdminTable>
        )}
      </AdminContent>
    </AdminLayout>
  );
}

export default withAdminAuthenticatedUser(ReportedUsersDashboard);
