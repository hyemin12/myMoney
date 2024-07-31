import express from 'express';
import {
  removeReview,
  getReviewDetails,
  createReview,
  updateReview,
  getReviewsWithPagination,
  approveReviewByAdmin,
  getUnverifiedReviews,
} from '../controllers/reviews.controller';
import { authentication } from '../middleware/authentication';
import { validateReview } from '../validator/reviews.validator';

const router = express.Router();

router.use(express.json());

router.route('/').get(authentication(), getReviewsWithPagination).post();

router.get('/unverifiedReviews', authentication(true), getUnverifiedReviews);
router
  .route('/:id')
  .get(authentication(), getReviewDetails)
  .delete(authentication(true), removeReview);

router.post('/', validateReview, authentication(true), createReview);
router.patch('/:id', validateReview, authentication(true), updateReview);
router.patch('/:id/approve', authentication(true), approveReviewByAdmin);

export { router as reviewsRouter };
