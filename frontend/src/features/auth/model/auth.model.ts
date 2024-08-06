export interface IUser {
  email: string;
  nickname: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegistration extends IUser {
  password: string;
  password_checked: string;
}

export interface IFullUser extends IUser {
  id: number;
  isAdmin: boolean;
  suspensionCount: number;
  status: '이용' | '정지' | '탈퇴';
  banEndDate: null | string;
}
