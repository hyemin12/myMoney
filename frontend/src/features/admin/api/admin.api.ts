import { httpClient } from '@/shared/utils/http';

export const getAllUsers = async (page: number) => {
  const { data } = await httpClient.get(`/users/all?page=${page}`);
  return data;
};

// 미인증 후기 관리
export const getUnverifiedReviews = async (page: number) => {
  const { data } = await httpClient.get(
    `/reviews/unverifiedReviews?page=${page}`,
  );
  return data;
};

export const patchApproveReview = async (reviewId: number) => {
  return await httpClient.patch(`/reviews/${reviewId}/approve`);
};

// 신고된 유저 관리
export const getSuspendedUsers = async (page: number) => {
  const { data } = await httpClient.get(`/reports/users?page=${page}`);
  return data;
};

export interface IHandleReportProps {
  reportId: number;
  result: '허위 신고' | '승인';
}

export const patchReport = async ({ reportId, result }: IHandleReportProps) => {
  return await httpClient.patch(`/reports/${reportId}`, { result });
};
