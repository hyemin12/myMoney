import { httpClient } from '@/shared/utils/http';

export const fetchCategory = async () => {
  const { data } = await httpClient.get('/category');
  return data;
};
