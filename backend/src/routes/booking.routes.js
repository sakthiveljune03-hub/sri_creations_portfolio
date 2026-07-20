import express from 'express';
import { body } from 'express-validator';
import { createBooking, getBookings } from '../controllers/booking.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

// Public contact form submission route
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('A valid email address is required').normalizeEmail(),
    body('message').notEmpty().withMessage('Message is required').trim(),
    body('phone').optional().trim(),
    body('projectType').optional().trim()
  ],
  validateRequest,
  createBooking
);

// Admin-only contact forms list route
router.get('/', verifyJWT, verifyAdmin, getBookings);

export default router;
