import express from 'express';
import { authentication } from '../middleware/authentication';
import {
  createReportHandler,
  getAllReportsHandler,
  handleReportHandler,
} from '../controllers/reports.controller';
import {
  validateAddReport,
  validateDeleteReport,
} from '../validator/reports.validator';

const router = express.Router();

// 신고 추가
router.post('/', validateAddReport, authentication(true), createReportHandler);

// 모든 신고 조회
router.get('/users', authentication(true), getAllReportsHandler);

// 신고 처리
router.patch(
  '/:reportId',
  validateDeleteReport,
  authentication(true),
  handleReportHandler,
);

export { router as reportsRouter };
