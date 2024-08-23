import { IFullUser } from '@/features/auth';
import { formatDate } from '@/shared/utils';
import { calcIndex } from '../utils/calcTableIndex';

interface Props {
  allUsers: IFullUser[];
  currentPage: number;
}

function AdminUserManagementTableBody({ allUsers, currentPage }: Props) {
  return (
    <>
      {allUsers.map((user, idx) => (
        <tr key={user.id}>
          <td>{calcIndex(currentPage, idx)}</td>
          <td data-testid="user-email">{user.email}</td>
          <td data-testid="user-nickname">{user.nickname}</td>
          <td data-testid="user-id">{user.id}</td>
          <td data-testid="user-status">{user.status}</td>
          <td data-testid="user-suspensionCount">{user.suspensionCount}</td>
          <td data-testid="user-banEndDate">
            {user.banEndDate ? formatDate(user.banEndDate) : '-'}
          </td>
        </tr>
      ))}
    </>
  );
}

export default AdminUserManagementTableBody;
