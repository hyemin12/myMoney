import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchReport } from '../api/admin.api';
import { QUERY_KEYS } from '@/shared/constants/querykeys';
import useModalStore from '@/store/modal.store';

export const usePatchReview = (message: string) => {
  const queryClient = useQueryClient();
  const { openModal } = useModalStore();

  return useMutation({
    mutationFn: patchReport,
    throwOnError: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS] });

      openModal('ALERT', {
        message,
      });
    },
  });
};
