import { QUERY_KEYS } from '@/shared/constants/querykeys';
import { queryClient } from '@/shared/utils';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteReview } from '../api/reviewDetail.api';

export const useDeleteReview = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      alert('후기가 삭제되었습니다.');
      if (pathname === '/list') {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEWS] });
      } else if (pathname.startsWith('/list/')) {
        navigate('/list');
      }
    },
    throwOnError: true,
  });
};
