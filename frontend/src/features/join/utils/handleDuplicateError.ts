import { isAxiosError } from 'axios';

export const handleDuplicateError = (
  error: unknown,
  duplicateType: string,
  duplicateMessage?: string,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  if (isAxiosError(error) && error.response) {
    const { message } = error.response.data;

    if (message === `Duplicate ${duplicateType}`) {
      setErrorMessage &&
        setErrorMessage(`이미 사용중인 ${duplicateMessage}입니다.`);
      return true;
    }
  }

  return false;
};
