import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchReview, deleteReview } from '@/api/review.api';
import useAuthStore from '@/store/auth.store';

export const useReviewDetail = (reviewId: number) => {
  const { isLoggedIn } = useAuthStore();
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
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
    } else {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  return { review, isLoading, deleteReviewHandler };
};
