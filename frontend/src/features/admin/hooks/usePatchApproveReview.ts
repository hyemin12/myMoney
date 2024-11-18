import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchApproveReview } from '../api/admin.api';
import useModalStore from '@/store/modal.store';
import { QUERY_KEYS } from '@/shared/constants/querykeys';

export const usePatchApproveReview = () => {
  const queryClient = useQueryClient();
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
