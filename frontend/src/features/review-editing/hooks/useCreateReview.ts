import { useMutation } from '@tanstack/react-query';
import { createReview } from '../api/reviewEditing.api';

export const useCreateReview = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: createReview,
    onSuccess,
    throwOnError: true,
  });
};
