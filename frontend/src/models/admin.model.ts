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
