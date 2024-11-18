import { httpClient } from '@/shared/utils/http';
import { IAuthProps } from '../models/auth.model';

export const checkedEmail = async (email: IAuthProps) => {
  return await httpClient.post('/users/checkedEmail', email);
};

export const checkedNickname = async (nickname: IAuthProps) => {
  return await httpClient.post('/users/checkedNickname', nickname);
};

export const join = async (userData: Omit<IAuthProps, 'password_checked'>) => {
  return await httpClient.post('/users/join', userData);
};

export const login = async (userData: IAuthProps) => {
  return await httpClient.post('/users/login', userData);
};

export const logout = async () => {
  return await httpClient.post('/users/logout');
};

export const getUserInfo = async () => {
  const { data } = await httpClient.get('/users/me');
  return data;
};
