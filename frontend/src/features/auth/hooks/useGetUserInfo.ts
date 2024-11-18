import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../api/auth.api';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

// 사용자 정보 조회
export const useUserInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_INFO],
    queryFn: getUserInfo,
  });
};
