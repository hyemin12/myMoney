import { useMutation } from '@tanstack/react-query';

import { addReport } from '../api/report.api';
import { IReport } from '../models/report.model';
import useAuthStore from '@/store/auth.store';
import useModalStore from '@/store/modal.store';

export const useReport = () => {
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useModalStore();

  const postReportMutation = useMutation({
    mutationFn: addReport,
    onSuccess: () => {
      openModal('ALERT', { message: '신고되었습니다.' });
    },
    onError: (error: any) => {
      console.log(error);
      if (error?.response?.status === 409) {
        openModal('ALERT', { message: '이미 신고한 유저입니다.' });
      }
    },
    throwOnError: (error: any) => {
      console.log(error);
      if (error?.response?.status === 409) return false;
      return true;
    },
  });
  const postReport = (data: IReport) => {
    if (!isLoggedIn) {
      openModal('LOGIN');
    }

    postReportMutation.mutate(data);
  };

  return {
    postReport,
  };
};
