import {
  AdminLayout,
  AdminContent,
  AdminTable,
  AdminReportTableBody,
  IFormatSuspendedUsers,
} from '@/features/admin';
import { withAdminAuthenticatedUser } from '@/shared/hocs';
import { useCurrentPage } from '@/shared/hooks/useCurrentPage';
import { useGetSuspendedUsers } from '@/features/admin/hooks/useGetSuspendedUsers';
import { ADMIN_SUSPENDED_USERS_TABLE_HEAD } from '@/shared/constants/adminTableHead';
import { usePatchReview } from '@/features/admin/hooks/usePatchReport';
import useModalStore from '@/store/modal.store';

function SuspendedUsersDashboard() {
  const { openModal } = useModalStore();

  const currentPage = useCurrentPage();
  const { data, isLoading } = useGetSuspendedUsers(currentPage);
  console.log(data);

  const suspendedUsers = data?.reports ?? [];
  const pagination = data?.pagination;

  const { mutate: cancelReport } = usePatchReview('신고가 취소되었습니다.');
  const { mutate: approveReport } =
    usePatchReview('정상적으로 처리되었습니다.');

  const handleCancelReport = (reportId: number) => {
    openModal('CONFIRM', {
      message: '이 신고는 허위신고로 확인되었습니다. 신고를 취소하시겠습니까?',
      approve: () => cancelReport({ reportId, result: '허위 신고' }),
    });
  };

  const handleApproveReport = (reportId: number) => {
    openModal('CONFIRM', {
      message: '신고를 승인하시겠습니까?',
      approve: () => approveReport({ reportId, result: '승인' }),
    });
  };

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
        isLoading={isLoading}
        totalPage={pagination?.totalCount}
      >
        {suspendedUsers.length === 0 ? (
          <div>
            <p>신고된 유저가 없습니다.</p>
          </div>
        ) : (
          <AdminTable tableHead={ADMIN_SUSPENDED_USERS_TABLE_HEAD}>
            <AdminReportTableBody
              currentPage={currentPage}
              suspendedUsers={sortSuspendedUsers(suspendedUsers)}
              cancelReport={handleCancelReport}
              approveReport={handleApproveReport}
            />
          </AdminTable>
        )}
      </AdminContent>
    </AdminLayout>
  );
}

export default withAdminAuthenticatedUser(SuspendedUsersDashboard);
