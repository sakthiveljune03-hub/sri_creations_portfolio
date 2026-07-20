import express from 'express';
import { body } from 'express-validator';
import { loginAdmin, getProfile } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Provide a valid email address').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  loginAdmin
);

router.get('/profile', verifyJWT, getProfile);

export default router;
