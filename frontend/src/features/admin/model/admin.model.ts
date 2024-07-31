export interface ISuspendedUsers {
  reportId: number;
  reportedUserId: number;
  reportedUserEmail: string;
  reportCount: number;
  reportReason: string;
  isSuspended: boolean;
}

export interface IFormatSuspendedUsers extends ISuspendedUsers {
  status: '정지' | '정지 종료';
}

export interface IAdminNavItem {
  path: string;
  name: '신고된 사용자 관리' | '미승인 후기 관리' | '사이트 바로가기';
  icon: JSX.Element;
  $iconSize?: number;
}

export interface IAdminTableHead {
  name: string;
  $widthRatio: number;
}
