import {
  AdminLayout,
  AdminContent,
  AdminTable,
  AdminReportTableBody,
} from '@/features/admin';
import { TableHeadItem } from '@/components/Admin/AdminTable';
import { withAdminAuthenticatedUser } from '@/shared/hocs';
import { useAdmin } from '@/features/admin/hooks/useAdmin';
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

  const sortSuspendedUsers = (users: IFormatSuspendedUsers[]) => {
    return users.sort((a, b) =>
      a.status === '정지' ? -1 : b.status === '정지' ? 1 : 0,
    );
  };

  const formattedAndSortedUsers = sortSuspendedUsers(
    formatSuspendedUsers(suspendedUsers),
  );

  const handleDeleteReport = (reportId: number) => {
    deleteReportAction(reportId);
  };

  return (
    <AdminLayout>
      <AdminContent
        title="신고된 유저 관리"
        isLoading={isLoadingSuspendedUsers}
      >
        {suspendedUsers.length === 0 ? (
          <tr>
            <td colSpan={tableHead.length}>신고된 유저가 없습니다.</td>
          </tr>
        ) : (
          <AdminTable tableHead={tableHead}>
            <AdminReportTableBody
              suspendedUsers={formattedAndSortedUsers}
              handleDeleteReport={handleDeleteReport}
            />
          </AdminTable>
        )}
      </AdminContent>
    </AdminLayout>
  );
}

export default withAdminAuthenticatedUser(ReportedUsersDashboard);
