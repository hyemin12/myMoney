import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Icon } from '@/shared/components';
import { IAdminNavItem } from '@/features/admin';

function AdminNavItem({ icon, name, path, $iconSize }: IAdminNavItem) {
  const { pathname } = useLocation();
  return (
    <NavItem to={path} className={pathname === path ? 'active' : ''}>
      <Icon fill="#fff" icon={icon} width={20} $iconSize={$iconSize} />
      <Title>{name}</Title>
    </NavItem>
  );
}

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 40px;
  padding: 10px 20px;
  text-decoration: none;
  transition: all 0.3s;
  &.active,
  &:hover {
    background-color: #4d9349;
  }
`;

const Title = styled.h4`
  color: #fff;
  font-size: ${({ theme }) => theme.text['medium'].fontSize};
`;

export default AdminNavItem;
