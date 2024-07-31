import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { addReport } from '../api/report.api';
import { IReport } from '../model/report.model';
import useAuthStore from '@/store/auth.store';

export const useReport = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const postReportMutation = useMutation({
    mutationFn: addReport,
    onSuccess: () => {
      alert('신고되었습니다.');
    },
    onError: (error: any) => {
      console.log(error);
      if (error?.response?.status === 409) {
        alert('이미 신고한 유저입니다.');
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
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
    }
    postReportMutation.mutate(data);
  };

  return {
    postReport,
  };
};
