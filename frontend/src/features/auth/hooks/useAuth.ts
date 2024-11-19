import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { ILoginSuccessResponse, IUserLogin } from '../models/auth.model';
import useAuthStore from '@/store/auth.store';
import { handleGoHome } from '@/shared/utils/routingUtils';
import { useLoginUser } from './useLoginMutation';
import { PATH } from '@/shared/constants/paths';
import { useLogoutUser } from './useLogoutMutation';

// 아이디 저장 만료일 (한달)
const EXPIRATION_MAX_AGE = 30 * 24 * 60 * 60;

export const useAuth = () => {
  const [_, setCookie, removeCookie] = useCookies(['email']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkedRememberEmail, setCheckedRememberEmail] = useState(false);

  const toggleCheckedRememberEmail = () => {
    setCheckedRememberEmail((prev) => !prev);
  };

  const navigate = useNavigate();
  const { storeLogin, storeLogout, setIsAdminUser } = useAuthStore();

  /** 로그인
   * 이메일을 기억하는 경우 쿠키에 이메일을 저장, 아니면 쿠키에서 이메일 삭제
   * 성공하면 스토어에 로그인 상태 저장,
   * 서버에서 반환된 사용자 데이터에 따라 관리자 여부를 확인하고, 관리자인 경우 관리자 페이지로 이동
   * 비밀번호가 일치하지 않는 경우, 에러 메세지 출력
   * 이외의 오류일 경우, ErrorBoundary에서 오류 처리
   */
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
        maxAge: EXPIRATION_MAX_AGE,
      });
    } else {
      removeCookie('email');
    }
    loginUserMutate(data);
  };

  /** 로그아웃
   * - 성공하면 스토어에 관리자 여부, 로그인 상태를 초기화 시키고, 메인페이지로 이동
   * - 오류가 발생하면 ErrorBoundary에서 처리
   */
  const logoutUserSuccess = () => {
    setIsAdminUser(false);
    storeLogout();
    handleGoHome();
  };
  const { mutate: logoutUserMutate } = useLogoutUser(logoutUserSuccess);

  return {
    errorMessage,
    logoutUser: () => logoutUserMutate,
    loginUser,
    checkedRememberEmail,
    toggleCheckedRememberEmail,
  };
};
