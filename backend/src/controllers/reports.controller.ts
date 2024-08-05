import { Request, Response } from 'express';
import {
  createReport,
  getAllReports,
  handleReport,
} from '../services/report.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';
import { CustomRequest } from '../middleware/authentication';
import { createPagination } from '../services/review.service';
import { ADMIN_LIMIT } from '../constance/pagination';

export const createReportHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  const { reportedUserId, reason } = req.body;
  const reporterUserId = Number(req.user?.id);

  try {
    const report = await createReport({
      reportedUserId,
      reporterUserId,
      reason,
    });
    res.status(201).json(report);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllReportsHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  const { page } = req.query;
  const numberPage = Number(page) || 1;
  const { isAdmin } = req.user!;
  if (!isAdmin) {
    throw new Error(ERROR_MESSAGE.DENIED);
  }

  try {
    const { reports, totalCount } = await getAllReports(numberPage);
    const pagination = await createPagination(
      numberPage,
      ADMIN_LIMIT,
      totalCount,
    );
    res.status(200).json({ reports, pagination });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const handleReportHandler = async (
  req: CustomRequest,
  res: Response,
) => {
  const { isAdmin } = req.user!;
  if (!isAdmin) {
    throw new Error(ERROR_MESSAGE.DENIED);
  }
  const { reportId } = req.params;
  const { result } = req.body;
  try {
    const report = await handleReport(Number(reportId), result);
    res.status(200).json(report);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
