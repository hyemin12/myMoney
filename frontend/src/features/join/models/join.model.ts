import { IUser } from '@/features/auth';

export interface IUserRegistration extends IUser {
  password: string;
  password_checked: string;
}
