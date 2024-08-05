import React from 'react';

import {
  AdminContent,
  AdminLayout,
  AdminTable,
  IAdminTableHead,
  useAdmin,
} from '@/features/admin';
import AdminUserManagementTableBody from '@/features/admin/components/AdminUserManagementTableBody';
import { IFullUser } from '@/features/auth';

const tableHead: IAdminTableHead[] = [
  { name: 'No', $widthRatio: 7 },
  { name: '이메일', $widthRatio: 20 },
  { name: '닉네임', $widthRatio: 20 },
  { name: '고유 아이디', $widthRatio: 15 },
  { name: '상태', $widthRatio: 10 },
  { name: '신고횟수', $widthRatio: 10 },
  { name: '정지 종료일', $widthRatio: 20 },
];

function UserManagementDashboard() {
  const { allUsers, isLoadingAllUsers } = useAdmin();

  const calcAllUsers = (users: IFullUser[]) => {
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
      <AdminContent title="사용자 관리" isLoading={isLoadingAllUsers}>
        <AdminTable tableHead={tableHead}>
          <AdminUserManagementTableBody allUsers={calcAllUsers(allUsers)} />
        </AdminTable>
      </AdminContent>
    </AdminLayout>
  );
}

export default UserManagementDashboard;
