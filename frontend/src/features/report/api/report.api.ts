import { IReport } from '@/features/report/model/report.model';
import { httpClient } from '@/shared/utils/http';

export const getSuspendedUsers = async () => {
  const { data } = await httpClient.get('/reports/users');
  return data;
};

export const deleteReport = async (reportId: number) => {
  return await httpClient.delete(`/reports/${reportId}`);
};

export const addReport = async (data: IReport) => {
  return await httpClient.post(`/reports`, data);
};
