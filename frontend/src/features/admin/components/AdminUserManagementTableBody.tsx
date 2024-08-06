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
