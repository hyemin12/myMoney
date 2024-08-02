import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AttentionIcon } from '@/assets/icons';
import { Icon } from '@/shared/components';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface Props {
  children: React.ReactNode;
}

function AdminLayout({ children }: Props) {
  const [isTabletSize, setIsTabletSize] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletSize(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isTabletSize)
    return (
      <AlertContainer>
        <Icon icon={<AttentionIcon />} width={90} fill="#ffc807" />
        <p>
          화면의 크기가 너무 작습니다.
          <br />
          화면의 크기를 키우거나, PC에서 접속해주세요.
        </p>
      </AlertContainer>
    );

  return (
    <LayoutContainer>
      <AdminSidebar />
      <AdminMainContent id="admin-main">
        <AdminHeader />
        {children}
      </AdminMainContent>
    </LayoutContainer>
  );
}
const AlertContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  p {
    padding-top: 40px;
    text-align: center;
  }
`;

const LayoutContainer = styled.div`
  width: 100%;
  min-width: 1200px;
  height: 100vh;
  margin: 0 auto;
`;

const AdminMainContent = styled.section`
  padding-left: 230px;
`;

export default AdminLayout;
