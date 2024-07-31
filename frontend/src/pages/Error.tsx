import { AxiosError } from 'axios';

import ForbiddenError from '@/features/error/ForbiddenError';
import InternalError from '@/features/error/InternalError';
import NotFoundError from '@/features/error/NotFoundError';

interface ErrorProps {
  error: unknown;
}

function Error({ error }: ErrorProps) {
  console.error(error);

  if (error instanceof AxiosError && error.response?.status === 404)
    return <NotFoundError />;

  // 정지된 유저일 경우 보여줄 컴포넌트
  if (
    error instanceof AxiosError &&
    error.response?.status === 403 &&
    error.response.data.message === 'User is suspended'
  )
    return <ForbiddenError error={error} />;

  return <InternalError />;
}

export default Error;
