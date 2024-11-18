import { useMutation } from '@tanstack/react-query';
import { checkedNickname } from '../api/join.api';
import { handleDuplicateError } from '../utils/handleDuplicateError';

// 닉네임 중복 체크
export const useCheckedNickname = (
  successFn: (nickname: string) => void,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  return useMutation({
    mutationFn: checkedNickname,
    onSuccess: (data) => {
      if (data) {
        successFn(data.data.nickname);
      }
    },
    onError: (error) => {
      console.error(error);
      handleDuplicateError(error, 'nickname', '닉네임', setErrorMessage);
    },
    throwOnError: (error) => {
      console.error(error);
      if (handleDuplicateError(error, 'nickname')) return false;
      return true;
    },
  });
};
