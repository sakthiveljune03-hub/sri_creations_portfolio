import express from 'express';
import { body } from 'express-validator';
import { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} from '../controllers/testimonial.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

// Public route
router.get('/', getTestimonials);

// Public route for creating reviews
router.post(
  '/',
  [
    body('clientName').notEmpty().withMessage('Client name is required').trim(),
    body('review').notEmpty().withMessage('Review text is required').trim(),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5')
  ],
  validateRequest,
  createTestimonial
);

router.put(
  '/:id',
  verifyJWT,
  verifyAdmin,
  [
    body('clientName').optional().notEmpty().withMessage('Client name cannot be empty').trim(),
    body('review').optional().notEmpty().withMessage('Review text cannot be empty').trim(),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5')
  ],
  validateRequest,
  updateTestimonial
);

router.delete('/:id', verifyJWT, verifyAdmin, deleteTestimonial);

export default router;
