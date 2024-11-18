import { useQuery } from '@tanstack/react-query';
import { getSuspendedUsers } from '../api/admin.api';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

export const useGetSuspendedUsers = (page: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_GET_SUSPENDED_USERS, page],
    queryFn: () => getSuspendedUsers(page),
    throwOnError: true,
  });
};
