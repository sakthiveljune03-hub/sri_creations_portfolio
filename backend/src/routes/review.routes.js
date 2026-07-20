import express from 'express';
import { body } from 'express-validator';
import {
  createReview,
  getPublishedReviews,
  streamReviews,
  getAllReviews,
  publishReview,
  unpublishReview,
  rejectReview,
  deleteReview
} from '../controllers/review.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

// Public routes
router.get('/reviews', getPublishedReviews);
router.get('/reviews/stream', streamReviews);

router.post(
  '/reviews',
  [
    body('customerName').notEmpty().withMessage('Customer name is required').trim(),
    body('service').notEmpty().withMessage('Service availed is required').trim(),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    body('review').notEmpty().withMessage('Review text is required').trim()
  ],
  validateRequest,
  createReview
);

// Admin-only routes
router.get('/admin/reviews', verifyJWT, verifyAdmin, getAllReviews);
router.put('/admin/reviews/:id/publish', verifyJWT, verifyAdmin, publishReview);
router.put('/admin/reviews/:id/unpublish', verifyJWT, verifyAdmin, unpublishReview);
router.put('/admin/reviews/:id/reject', verifyJWT, verifyAdmin, rejectReview);
router.delete('/admin/reviews/:id', verifyJWT, verifyAdmin, deleteReview);

export default router;
