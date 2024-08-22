import { TReportReason } from '@/features/report';

export interface ISuspendedUsers {
  reportId: number;
  reporterUserEmail: string;
  reportedUserEmail: string;
  reportCount: number;
  reportReason: TReportReason;
  reportedAt: string;
}

export interface IFormatSuspendedUsers extends ISuspendedUsers {
  isFalseReport: boolean;
  handledAt: string;
  result: null | '처리 완료';
  status: '대기' | '허위 신고' | '승인';
}

export interface IAdminNavItem {
  path: string;
  name:
    | '사용자 관리'
    | '신고된 사용자 관리'
    | '미승인 후기 관리'
    | '사이트 바로가기';
  icon: JSX.Element;
  $iconSize?: number;
}

export interface IAdminTableHead {
  name: string;
  $widthRatio: number;
}
