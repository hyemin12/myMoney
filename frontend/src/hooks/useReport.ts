import { useMutation } from '@tanstack/react-query';

import { addReport } from '@/api/report.api';
import { IReport } from '@/models/report.model';

export const useReport = () => {
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
    postReportMutation.mutate(data);
  };

  return {
    postReport,
  };
};
