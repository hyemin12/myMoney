import { useLogoutUser } from './useLogoutMutation';
import { handleGoHome } from '@/shared/utils/routingUtils';
import useAuthStore from '@/store/auth.store';

export const useLogout = () => {
  const { storeLogout, setIsAdminUser } = useAuthStore();

  const logoutUserSuccess = () => {
    setIsAdminUser(false);
    storeLogout();
    handleGoHome();
  };

  const { mutate: logoutUserMutate } = useLogoutUser(logoutUserSuccess);

  const logoutUser = () => logoutUserMutate();

  return { logoutUser };
};
