import { useMutation } from '@tanstack/react-query';
import { join } from '../api/join.api';

// 회원가입
export const useJoinUser = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: join,
    onSuccess,
    throwOnError: true,
  });
};
