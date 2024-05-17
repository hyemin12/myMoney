import { useMutation, useQuery } from '@tanstack/react-query';
import { createReview, fetchReviews } from '@/api/review.api';
import { IReview } from '@/models/review.model';
import { useNavigate } from 'react-router-dom';

export const useReview = () => {
  const navigate = useNavigate();

  const addToReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      alert('저장되었습니다.');
      navigate('/list');
    },
    throwOnError: true,
  });

  const addToReview = (data: IReview) => {
    addToReviewMutation.mutate(data);
  };

  const { data: reviews, isLoading: isLoadingFetchReviews } = useQuery({
    queryKey: ['fetchReviews'],
    queryFn: fetchReviews,
  });

  console.log(reviews, isLoadingFetchReviews);

  return { addToReview, reviews };
};
