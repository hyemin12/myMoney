import styled from 'styled-components';

import {
  DashboardLinkIcon,
  UserIcon,
  DashboardUnapprovedReviewIcon,
  NaedonnaesanTextLogo,
  ReportIcon,
} from '@/assets/icons';
import AdminNavItem from './AdminNavItem';

function AdminSidebar() {
  return (
    <Container>
      <Logo>
        <NaedonnaesanTextLogo />
      </Logo>

      <LinkToService>
        <AdminNavItem
          path="/"
          icon={<DashboardLinkIcon />}
          name="사이트 바로가기"
        />
      </LinkToService>

      <div>
        <NavSectionTitle>사이트관리</NavSectionTitle>
        <nav>
          <AdminNavItem
            path="/admin/users"
            name="사용자 관리"
            icon={<UserIcon />}
          />
          <AdminNavItem
            path="/admin/report-user"
            name="신고된 사용자 관리"
            icon={<ReportIcon />}
          />
          <AdminNavItem
            path="/admin/unverified-reviews"
            name="미승인 후기 관리"
            icon={<DashboardUnapprovedReviewIcon />}
            $iconSize={16}
          />
        </nav>
      </div>
    </Container>
  );
}

const Container = styled.aside`
  width: 230px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.darkGray};
  position: fixed;
  top: 0;
  left: 0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 51px;
  padding: 0 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};
  svg {
    width: 80px;
    height: 20px;
  }
`;

const LinkToService = styled.div`
  padding: 25px 0;
`;

const NavSectionTitle = styled.h4`
  padding: 0 25px;
  margin-bottom: 14px;
  font-size: ${({ theme }) => theme.text['small'].fontSize};
  color: ${({ theme }) => theme.color.background};
`;

export default AdminSidebar;
