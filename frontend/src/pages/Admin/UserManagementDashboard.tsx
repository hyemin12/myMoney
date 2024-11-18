import { AdminContent, AdminLayout, AdminTable } from '@/features/admin';
import AdminUserManagementTableBody from '@/features/admin/components/AdminUserManagementTableBody';
import { useGetAllUsers } from '@/features/admin/hooks/useGetAllUsers';
import { IFullUser } from '@/features/auth';
import { ADMIN_USERS_TABLE_HEAD } from '@/shared/constants/adminTableHead';
import { useCurrentPage } from '@/shared/hooks/useCurrentPage';

function UserManagementDashboard() {
  const currentPage = useCurrentPage();
  const { data, isLoading } = useGetAllUsers(currentPage);

  const users = data?.users ?? [];
  const pagination = data?.pagination;

  const mapUsersWithUpdatedStatus = (users: IFullUser[]) => {
    return users.map((user) => {
      const banEndDate = user.banEndDate ? new Date(user.banEndDate) : null;
      const status =
        banEndDate && banEndDate > new Date() ? '정지' : user.status;

      return {
        ...user,
        status,
      };
    });
  };
  return (
    <AdminLayout>
      <AdminContent
        title="사용자 관리"
        isLoading={isLoading}
        totalPage={pagination?.totalCount || 1}
      >
        <AdminTable tableHead={ADMIN_USERS_TABLE_HEAD}>
          <AdminUserManagementTableBody
            currentPage={currentPage}
            allUsers={mapUsersWithUpdatedStatus(users)}
          />
        </AdminTable>
      </AdminContent>
    </AdminLayout>
  );
}

export default UserManagementDashboard;
