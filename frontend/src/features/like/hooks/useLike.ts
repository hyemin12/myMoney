import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

import { likeReview, unlikeReview } from '../api/like.api';

interface Props {
  reviewId: number;
  isLikedDB: boolean;
  likesDB: number;
}

export const useLike = ({ reviewId, isLikedDB, likesDB }: Props) => {
  const [isLiked, setIsLiked] = useState(isLikedDB);
  const [likes, setLikes] = useState(Number(likesDB));

  const likeToggleAction = useCallback(async () => {
    if (isLiked) {
      await unlikeReview(reviewId);
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      await likeReview(reviewId);
      setLikes((prevLikes) => prevLikes + 1);
    }
    setIsLiked((prevIsLiked) => !prevIsLiked);
  }, [isLiked, reviewId]);

  const likeToggleMutation = useMutation({
    mutationFn: likeToggleAction,
    onError: (error: any) => {
      setIsLiked((prevIsLiked) => !prevIsLiked);
      setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
      console.error(error);
    },
  });

  const likeToggle = () => {
    likeToggleMutation.mutate();
  };

  return { likeToggle, localIsLiked: isLiked, localLikes: likes };
};
