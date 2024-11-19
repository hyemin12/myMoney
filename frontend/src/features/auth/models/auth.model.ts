export interface IAuthProps {
  email?: string;
  nickname?: string;
  password?: string;
}

export interface IUser {
  email: string;
  nickname: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IFullUser extends IUser {
  id: number;
  isAdmin: boolean;
  suspensionCount: number;
  status: '이용' | '정지' | '탈퇴';
  banEndDate: null | string;
}

export interface ILoginSuccessResponse {
  email: string;
  isAdmin: boolean;
  message: string;
}
