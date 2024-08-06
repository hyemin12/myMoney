import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import {
  DashboardLinkIcon,
  UserIcon,
  DashboardUnapprovedReviewIcon,
  NaedonnaesanTextLogo,
  ReportIcon,
} from '@/assets/icons';
import AdminNavItem from './AdminNavItem';
import { IAdminNavItem } from '../models/admin.model';

const adminNav: IAdminNavItem[] = [
  {
    path: '/admin/users',
    name: '사용자 관리',
    icon: <UserIcon />,
  },
  {
    path: '/admin/report-user',
    name: '신고된 사용자 관리',
    icon: <ReportIcon />,
  },
  {
    path: '/admin/unverified-reviews',
    name: '미승인 후기 관리',
    icon: <DashboardUnapprovedReviewIcon />,
    $iconSize: 16,
  },
];

function AdminSidebar() {
  const { pathname } = useLocation();
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
          {adminNav.map((nav) => (
            <AdminNavItem
              isActive={pathname === nav.path}
              {...nav}
              key={nav.name}
            />
          ))}
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
