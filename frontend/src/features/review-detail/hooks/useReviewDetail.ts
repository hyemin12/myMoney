import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import useAuthStore from '@/store/auth.store';
import { deleteReview, fetchReview } from '../api/reviewDetail.api';
import useModalStore from '@/store/modal.store';

export const useReviewDetail = (reviewId: number) => {
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useModalStore();

  const navigate = useNavigate();

  const { data: review, isLoading } = useQuery({
    queryKey: ['fetch-review'],
    queryFn: () => fetchReview(reviewId),
    throwOnError: true,
  });

  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      navigate(-1);
    },
  });

  const deleteReviewHandler = () => {
    if (!isLoggedIn) {
      openModal('LOGIN', { shouldNavigateBack: false });
    }

    deleteReviewMutation.mutate(reviewId);
  };

  return { review, isLoading, deleteReviewHandler };
};
