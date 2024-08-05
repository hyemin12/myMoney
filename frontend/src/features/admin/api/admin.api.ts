import { httpClient } from '@/shared/utils/http';

export const fetchUnverifiedReviews = async () => {
  const { data } = await httpClient.get('/reviews/unverifiedReviews');
  return data;
};

export const fetchApproveReview = async (reviewId: number) => {
  return await httpClient.patch(`/reviews/${reviewId}/approve`);
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

export const fetchAllUsers = async () => {
  return await httpClient.get('/users/all');
};
