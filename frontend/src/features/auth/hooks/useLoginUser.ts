import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth.api';
import { ILoginSuccessResponse } from '../models/auth.model';

export const useLoginUser = (
  onSuccess: (res: ILoginSuccessResponse) => void,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      onSuccess(res.data);
    },
    onError: (error: any) => {
      const { message } = error.response.data;
      if (!setErrorMessage) throw error;

      if (message === 'Not Matched Password')
        setErrorMessage('비밀번호가 틀렸습니다.');
      if (message === 'User not found') {
        setErrorMessage('존재하지 않는 이메일입니다.');
      }

      throw error;
    },
    throwOnError: (error) => {
      console.log(error);
      if (
        error?.response?.status === 400 ||
        error?.response?.data.message === 'User not found'
      )
        return false;
      return true;
    },
  });
};
