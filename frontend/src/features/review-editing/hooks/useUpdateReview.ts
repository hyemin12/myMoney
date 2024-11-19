import { useMutation } from '@tanstack/react-query';
import { updateReview } from '../api/reviewEditing.api';
import { IReviewEdit } from '../models/reviewEditing.model';

export const useUpdateReview = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IReviewEdit }) =>
      updateReview(id, data),
    onSuccess,
    throwOnError: true,
  });
};
