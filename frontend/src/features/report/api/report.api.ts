import { IReport } from '@/features/report/model/report.model';
import { httpClient } from '@/shared/utils/http';

export const addReport = async (data: IReport) => {
  return await httpClient.post(`/reports`, data);
};
