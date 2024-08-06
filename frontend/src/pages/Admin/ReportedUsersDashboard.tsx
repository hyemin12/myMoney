import { useEffect } from 'react';

import {
  AdminLayout,
  AdminContent,
  AdminTable,
  AdminReportTableBody,
  IAdminTableHead,
  IFormatSuspendedUsers,
} from '@/features/admin';
import { withAdminAuthenticatedUser } from '@/shared/hocs';
import { useAdmin } from '@/features/admin/';

const tableHead: IAdminTableHead[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '신고자', $widthRatio: 14 },
  { name: '신고 사유', $widthRatio: 20 },
  { name: '신고 당한 유저', $widthRatio: 14 },
  { name: '신고일자', $widthRatio: 12 },
  { name: '상태', $widthRatio: 8 },
  { name: '처리일자', $widthRatio: 12 },
  { name: '검토', $widthRatio: 10 },
  { name: '', $widthRatio: 20 },
];

function ReportedUsersDashboard() {
  const {
    isLoadingSuspendedUsers,
    refetchSuspendedUsers,
    suspendedUsers,
    suspendedUsersPagination,
    cancelReport,
    approveReport,
    currentPage,
  } = useAdmin();

  useEffect(() => {
    refetchSuspendedUsers();
  }, [refetchSuspendedUsers]);

  const sortSuspendedUsers = (users: IFormatSuspendedUsers[]) => {
    const statusPriority = {
      대기: 1,
      '허위 신고': 2,
      승인: 3,
    };

    return users.sort(
      (a, b) =>
        (statusPriority[a.status] || 4) - (statusPriority[b.status] || 4),
    );
  };
  return (
    <AdminLayout>
      <AdminContent
        title="신고된 유저 관리"
        isLoading={isLoadingSuspendedUsers}
        totalPage={suspendedUsersPagination?.totalCount}
      >
        {suspendedUsers.length === 0 ? (
          <div>
            <p>신고된 유저가 없습니다.</p>
          </div>
        ) : (
          <AdminTable tableHead={tableHead}>
            <AdminReportTableBody
              currentPage={currentPage}
              suspendedUsers={sortSuspendedUsers(suspendedUsers)}
              cancelReport={cancelReport}
              approveReport={approveReport}
            />
          </AdminTable>
        )}
      </AdminContent>
    </AdminLayout>
  );
}

export default withAdminAuthenticatedUser(ReportedUsersDashboard);
