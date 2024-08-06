import { IReport } from '@/features/report/models/report.model';
import { httpClient } from '@/shared/utils/http';

export const addReport = async (data: IReport) => {
  return await httpClient.post(`/reports`, data);
};
