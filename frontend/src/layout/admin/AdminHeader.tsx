import styled from 'styled-components';

import { useAuth } from '@/features/auth';
import { Button } from '@/shared/components';

function AdminHeader() {
  const { logoutUser } = useAuth();
  return (
    <Header>
      <h4>관리자 페이지</h4>
      <Button
        aria-label="로그아웃 버튼"
        scheme="primary"
        size="small"
        onClick={logoutUser}
      >
        로그아웃
      </Button>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #a0a19c;
  padding: 0 15px;
  h4 {
    color: #fff;
  }
  button {
    height: 30px;
    background-color: ${({ theme }) => theme.color.darkGray};
  }
`;

export default AdminHeader;
