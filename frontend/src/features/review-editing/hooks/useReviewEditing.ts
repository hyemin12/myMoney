import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  createReview,
  getReviewById,
  updateReview,
} from '../api/reviewEditing.api';
import useModalStore from '@/store/modal.store';
import { IReviewEdit } from '../models/reviewEditing.model';

export const useReviewEditing = (id?: string) => {
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const addToReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      openModal('ALERT', { message: '저장되었습니다.' });
      navigate('/list');
    },
    throwOnError: true,
  });

  const addToReview = (data: IReviewEdit) => {
    addToReviewMutation.mutate(data);
  };

  const {
    data: reviewData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['review', id],
    queryFn: () => (id ? getReviewById(id) : undefined),
    enabled: false,
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const updateToReviewMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IReviewEdit }) =>
      updateReview(id, data),
    onSuccess: () => {
      openModal('ALERT', { message: '수정되었습니다.' });
      navigate(`list/${id}`);
    },
    throwOnError: true,
  });

  const updateToReview = (id: string, data: IReviewEdit) => {
    updateToReviewMutation.mutate({ id, data });
  };

  return { addToReview, review: reviewData?.data, isLoading, updateToReview };
};
