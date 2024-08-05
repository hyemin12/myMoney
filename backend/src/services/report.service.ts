import { ERROR_MESSAGE } from '../constance/errorMessage';
import { Report } from '../entity/report_content.entity';
import { User } from '../entity/users.entity';
import {
  createReportInDB,
  findAllReports,
  findReportById,
  updateReportInDB,
} from '../models/report.model';
import { findUserById, updateUserInDB } from '../models/user.model';
import { calcSuspensionEndDate } from '../utils/authUtils';

export interface ICreateReportProps {
  reportedUserId: number;
  reporterUserId: number;
  reason: string;
}

export const createReport = async ({
  reportedUserId,
  reporterUserId,
  reason,
}: ICreateReportProps) => {
  const reportedUser = await findUserById(reportedUserId);
  if (!reportedUser) throw new Error(ERROR_MESSAGE.INVALID_USER);

  const reporterUser = await findUserById(reporterUserId);
  if (!reporterUser) throw new Error(ERROR_MESSAGE.INVALID_USER);

  const report = new Report();
  report.reporterUser = reporterUser;
  report.reportedUser = reportedUser;
  report.reason = reason;

  return await createReportInDB(report);
};

export const getAllReports = async () => {
  return await findAllReports();
};

export const markReportAsFalse = async (reportId: number) => {
  const report = await findReportById(reportId);
  if (!report) throw new Error(ERROR_MESSAGE.INVALID_DATA);

  report.isFalseReport = true;
  report.status = '허위 신고';
  report.result = '처리 완료';
  report.handledAt = new Date();

  return await updateReportInDB(report);
};

export const handleReport = async (
  reportId: number,
  result: '승인' | '허위 신고',
) => {
  const report = await findReportById(reportId);
  if (!report) throw new Error(ERROR_MESSAGE.INVALID_DATA);

  report.status = result;
  report.result = '처리 완료';
  report.handledAt = new Date();

  await updateReportInDB(report);

  if (result === '승인') {
    const reportedUser = await findUserById(report.reportedUser.id);
    if (!reportedUser) throw new Error(ERROR_MESSAGE.INVALID_USER);

    const calcEndDate = calcSuspensionEndDate(
      reportedUser.suspensionCount + 1,
      reportedUser.banEndDate,
    );

    reportedUser.suspensionCount += 1;
    reportedUser.banEndDate = calcEndDate;

    await updateUserInDB(reportedUser);
  }

  return report;
};
