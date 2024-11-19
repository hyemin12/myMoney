import { httpClient } from '@/shared/utils/http';
import { IAuthProps } from '../models/auth.model';

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
