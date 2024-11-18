import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../api/admin.api';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

export const useGetAllUsers = (page: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_GET_ALL_USERS, page],
    queryFn: () => getAllUsers(page),
    throwOnError: true,
  });
};
