import { httpClient } from '@/shared/utils/http';

export const fetchUnverifiedReviews = async (page: number) => {
  const { data } = await httpClient.get(
    `/reviews/unverifiedReviews?page=${page}`,
  );
  return data;
};

export const fetchApproveReview = async (reviewId: number) => {
  return await httpClient.patch(`/reviews/${reviewId}/approve`);
};

export const fetchSuspendedUsers = async (page: number) => {
  const { data } = await httpClient.get(`/reports/users?page=${page}`);
  return data;
};

export interface IHandleReportProps {
  reportId: number;
  result: '허위 신고' | '승인';
}

export const handleReport = async ({
  reportId,
  result,
}: IHandleReportProps) => {
  return await httpClient.patch(`/reports/${reportId}`, { result });
};

export const fetchAllUsers = async (page: number) => {
  const { data } = await httpClient.get(`/users/all?page=${page}`);
  return data;
};
