import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { ILoginSuccessResponse, IUserLogin } from '../models/auth.model';
import useAuthStore from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from './useLoginMutation';
import { PATH } from '@/shared/constants/paths';

export const useLogin = () => {
  const [_, setCookie, removeCookie] = useCookies(['email']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkedRememberEmail, setCheckedRememberEmail] = useState(false);
  const navigate = useNavigate();
  const { storeLogin, setIsAdminUser } = useAuthStore();

  const toggleCheckedRememberEmail = () => {
    setCheckedRememberEmail((prev) => !prev);
  };

  const loginUserSuccess = (res: ILoginSuccessResponse) => {
    setErrorMessage(null);
    storeLogin();

    const { isAdmin } = res;

    if (isAdmin) {
      setIsAdminUser(true);
      navigate(PATH.USER_MANAGEMENT);
    } else {
      navigate(-1);
    }
  };

  const { mutate: loginUserMutate } = useLoginUser(
    loginUserSuccess,
    setErrorMessage,
  );

  const loginUser = (data: IUserLogin, rememberEmail: boolean) => {
    if (rememberEmail) {
      setCookie('email', data.email, {
        path: PATH.LOGIN,
        maxAge: 30 * 24 * 60 * 60, // 한 달
      });
    } else {
      removeCookie('email');
    }
    loginUserMutate(data);
  };

  return {
    loginUser,
    errorMessage,
    checkedRememberEmail,
    toggleCheckedRememberEmail,
  };
};
