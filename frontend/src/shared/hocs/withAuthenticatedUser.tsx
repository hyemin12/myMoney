import React, { useEffect } from 'react';

import useAuthStore from '@/store/auth.store';
import useModalStore from '@/store/modal.store';
import { Modal } from '../components';

/** 로그인이 필요한 페이지를 로그인하지 않은 유저가 접근했을 때 로그인 페이지로로 리다이렉션 */
export default function withAuthenticatedUser(
  WrappedComponent: React.ComponentType,
) {
  function Component() {
    const { isLoggedIn } = useAuthStore();
    const { openModal } = useModalStore();

    useEffect(() => {
      if (!isLoggedIn) {
        openModal('LOGIN', { shouldNavigateBack: true });
      }
    }, [isLoggedIn, openModal]);

    if (!isLoggedIn) return <Modal />;

    return <WrappedComponent />;
  }
  return Component;
}
