import styled from 'styled-components';

import Navigation from './Navigation';
import Header from './Header';
import { Modal } from '@/shared/components';
import useModalStore from '@/store/modal.store';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton: boolean;
  title?: string;
}

function Layout({ children, showBackButton, title }: LayoutProps) {
  const { $isOpen } = useModalStore();

  return (
    <Container>
      {$isOpen && <Modal />}

      <Header title={title} showBackButton={showBackButton} />
      <div id="main">{children}</div>
      <Navigation />
    </Container>
  );
}

const Container = styled.div`
  width: 390px;
  margin-inline: auto;
  padding-bottom: 85px;
`;
export default Layout;
