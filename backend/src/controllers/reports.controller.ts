import { Request, Response } from 'express';
import {
  createReport,
  getAllReports,
  handleReport,
} from '../services/report.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';
import { CustomRequest } from '../middleware/authentication';

export const createReportHandler = async (req: Request, res: Response) => {
  const { reportedUserId, reporterUserId, reason } = req.body;

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
  const { isAdmin } = req.user!;
  if (!isAdmin) {
    throw new Error(ERROR_MESSAGE.DENIED);
  }
  try {
    const reports = await getAllReports();
    res.status(200).json(reports);
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
  console.log(reportId, result);
  try {
    const report = await handleReport(Number(reportId), result);
    res.status(200).json(report);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
