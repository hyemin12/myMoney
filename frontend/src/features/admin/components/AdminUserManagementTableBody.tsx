import { IFullUser } from '@/features/auth';
import { formatDate } from '@/shared/utils';
import React from 'react';

interface Props {
  allUsers: IFullUser[];
}

function AdminUserManagementTableBody({ allUsers }: Props) {
  return (
    <>
      {allUsers.map((user, idx) => (
        <tr>
          <td>{idx + 1}</td>
          <td>{user.email}</td>
          <td>{user.nickname}</td>
          <td>{user.id}</td>
          <td>{user.status}</td>
          <td>{user.suspensionCount}</td>
          <td>{user.banEndDate ? formatDate(user.banEndDate) : '-'}</td>
        </tr>
      ))}
    </>
  );
}

export default AdminUserManagementTableBody;
