import { useMutation } from '@tanstack/react-query';
import { checkedEmail } from '../api/join.api';
import { handleDuplicateError } from '../utils/handleDuplicateError';

export const useCheckedEmail = (
  successFn: (email: string) => void,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  return useMutation({
    mutationFn: checkedEmail,
    onSuccess: (data) => {
      if (data) {
        successFn(data.data?.email);
      }
    },
    onError: (error) => {
      console.error(error);
      handleDuplicateError(error, 'email', '이메일', setErrorMessage);
    },
    throwOnError: (error) => {
      console.error(error);
      if (handleDuplicateError(error, 'email')) return false;
      return true;
    },
  });
};
