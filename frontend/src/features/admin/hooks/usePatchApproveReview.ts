import { useMutation } from '@tanstack/react-query';
import { patchApproveReview } from '../api/admin.api';
import useModalStore from '@/store/modal.store';
import { QUERY_KEYS } from '@/shared/constants/querykeys';
import { queryClient } from '@/shared/utils';

export const usePatchApproveReview = () => {
  const { openModal } = useModalStore();

  return useMutation({
    mutationFn: patchApproveReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN_GET_UNVERIFIED_REVIEWS],
      });
      openModal('ALERT', { message: '정상적으로 처리되었습니다.' });
    },
    throwOnError: true,
  });
};
