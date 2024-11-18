import useUserRegistrationStore from '@/store/user.registration.store';
import { useState } from 'react';
import { useCheckedEmail } from './useCheckedEmail';
import { useCheckedNickname } from './useCheckedNickname';
import { useJoinUser } from './useJoinUser';
import { useNavigate } from 'react-router-dom';
import useModalStore from '@/store/modal.store';
import { PATH } from '@/shared/constants/paths';

export const useJoin = () => {
  const navigate = useNavigate();
  const { storeEmail, storeNickname, setStoreEmail, setStoreNickname } =
    useUserRegistrationStore();
  const { openModal } = useModalStore();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /** 이메일 중복 검사
   * - 성공하면 스토어에 이메일을 저장하고, 다음단계로 이동
   * - 중복 이메일일 경우, 오류메세지 출력
   * - 이외의 오류일 경우, ErrorBoundary 사용해서 오류 처리
   */
  const checkedEmailSuccess = (email: string) => {
    setErrorMessage(null);
    setStoreEmail(email);
    navigate(PATH.JOIN_STEP2);
  };
  const { mutate: checkedEmailMutate } = useCheckedEmail(
    checkedEmailSuccess,
    setErrorMessage,
  );

  /** 닉네임 중복 검사
   * - 성공하면 스토어에 닉네임을 저장하고, 다음 단계로 이동
   * - 중복 닉네임일 경우, 오류 메세지 출력
   * - 이외의 오류일 경우, ErrorBoundary 사용해서 오류 처리
   */
  const checkedNicknameSuccess = (nickname: string) => {
    setErrorMessage(null);
    setStoreNickname(nickname);
    navigate(PATH.JOIN_STEP3);
  };
  const { mutate: checkedNicknameMutate } = useCheckedNickname(
    checkedNicknameSuccess,
    setErrorMessage,
  );

  /** 회원 가입
   * - 성공하면 스토어의 이메일/닉네임/오류메세지 초기화, 로그인화면으로 이동
   * - 오류 발생시 ErrorBoundary에서 오류 처리
   */
  const joinUserSuccess = () => {
    setStoreEmail(null);
    setStoreNickname(null);
    setErrorMessage(null);
    openModal('ALERT', { message: '회원가입에 성공했습니다.' });
    navigate(PATH.LOGIN);
  };
  const { mutate: joinUserMutate } = useJoinUser(joinUserSuccess);

  const handleJoinUser = (password: string) => {
    if (!storeEmail) {
      openModal('ALERT', { message: '이메일을 입력하지 않으셨습니다.' });
      navigate(PATH.JOIN_STEP1);
      return;
    }
    if (!storeNickname) {
      openModal('ALERT', { message: '닉네임을 입력하지 않으셨습니다.' });
      navigate(PATH.JOIN_STEP2);
      return;
    }

    joinUserMutate({ email: storeEmail, nickname: storeNickname, password });
  };

  return {
    checkedEmail: checkedEmailMutate,
    checkedNickname: checkedNicknameMutate,
    errorMessage,
    storeEmail,
    joinUser: handleJoinUser,
  };
};
