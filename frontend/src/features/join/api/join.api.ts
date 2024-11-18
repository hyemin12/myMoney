import { IAuthProps } from '@/features/auth';
import { httpClient } from '@/shared/utils';

export const checkedEmail = async (email: IAuthProps) => {
  return await httpClient.post('/users/checkedEmail', email);
};

export const checkedNickname = async (nickname: IAuthProps) => {
  return await httpClient.post('/users/checkedNickname', nickname);
};

export const join = async (userData: Omit<IAuthProps, 'password_checked'>) => {
  return await httpClient.post('/users/join', userData);
};
