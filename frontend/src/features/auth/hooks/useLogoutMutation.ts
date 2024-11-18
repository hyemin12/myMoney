import { useMutation } from '@tanstack/react-query';
import { logout } from '../api/auth.api';

export const useLogoutUser = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: logout,
    onSuccess,
  });
};
