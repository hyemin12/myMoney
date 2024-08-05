import { useMutation, useQuery } from '@tanstack/react-query';

import { getSuspendedUsers } from '@/features/report/api/report.api';
import {
  fetchApproveReview,
  fetchUnverifiedReviews,
  handleReport,
  IHandleReportProps,
} from '../api/admin.api';
import useModalStore from '@/store/modal.store';

export const useAdmin = () => {
  const { openModal } = useModalStore();

  // 정지된 사용자 정보 가져오기
  const {
    data: suspendedUsersData,
    isLoading: isLoadingSuspendedUsers,
    refetch: refetchSuspendedUsers,
  } = useQuery({
    queryKey: ['getSuspendedUsers'],
    queryFn: getSuspendedUsers,
    throwOnError: true,
  });

  // 신고 취소 처리하기
  const cancelReportMutation = useMutation({
    mutationFn: handleReport,
    throwOnError: true,
    onSuccess: () => {
      refetchSuspendedUsers();
      openModal('ALERT', { message: '신고가 취소되었습니다.' });
    },
  });
  const cancelReport = (reportId: number) => {
    openModal('CONFIRM', {
      message: '이 신고는 허위신고로 확인되었습니다. 신고를 취소하시겠습니까?',
      approve: () =>
        cancelReportMutation.mutate({ reportId, result: '허위 신고' }),
    });
  };

  // 신고 승인 처리하기
  const approveReportMutation = useMutation({
    mutationFn: handleReport,
    throwOnError: true,
    onSuccess: () => {
      refetchSuspendedUsers();
      openModal('ALERT', { message: '신고가 취소되었습니다.' });
    },
  });
  const approveReport = (reportId: number) => {
    openModal('CONFIRM', {
      message: '신고를 승인하시겠습니까?',
      approve: () => approveReportMutation.mutate({ reportId, result: '승인' }),
    });
  };
  // 미인증 후기 가져오기
  const {
    data: unverifiedReviewsData,
    isLoading: isLoadingUnverifiedReviews,
    refetch: refetchUnverifiedReviews,
  } = useQuery({
    queryKey: ['unverifiedReviews'],
    queryFn: fetchUnverifiedReviews,
    throwOnError: true,
    enabled: false,
  });

  // 미인증 후기 인증 처리하기
  const approveReviewMutation = useMutation({
    mutationFn: fetchApproveReview,
    onSuccess: () => {
      refetchUnverifiedReviews();
      openModal('ALERT', { message: '정상적으로 처리되었습니다.' });
    },
    throwOnError: true,
  });

  const approveReview = (reviewId: number) => {
    approveReviewMutation.mutate(reviewId);
  };

  return {
    suspendedUsers: suspendedUsersData || [],
    isLoadingSuspendedUsers,
    cancelReport,
    approveReport,
    approveReview,
    isLoadingUnverifiedReviews,
    unverifiedReviews: unverifiedReviewsData?.reviews || [],
  };
};
