import { AppDataSource } from '../data-source';
import { Report } from '../entity/report_content.entity';

const reportRepository = AppDataSource.getRepository(Report);

export const createReportInDB = async (report: Report) => {
  return await reportRepository.save(report);
};

export const findAllReports = async () => {
  return await reportRepository
    .createQueryBuilder('report')
    .leftJoinAndSelect('report.reporterUser', 'reporterUser')
    .leftJoinAndSelect('report.reportedUser', 'reportedUser')
    .select([
      'report.id as reportId',
      'report.reason as reportReason',
      'report.reportedAt as reportedAt',
      'report.status as status',
      'report.result as result',
      'report.handledAt as handledAt',
      'report.isFalseReport as isFalseReport',
      'reporterUser.email AS reporterUserEmail',
      'reportedUser.email AS reportedUserEmail',
    ])
    .orderBy('report.reportedAt', 'DESC')
    .getRawMany();
};

export const findReportById = async (id: number) => {
  return await reportRepository
    .createQueryBuilder('report')
    .leftJoinAndSelect('report.reporterUser', 'reporterUser')
    .leftJoinAndSelect('report.reportedUser', 'reportedUser')
    .where('report.id = :id', { id })
    .getOne();
};

export const updateReportInDB = async (report: Report) => {
  return await reportRepository.save(report);
};
