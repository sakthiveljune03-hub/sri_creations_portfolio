import express from 'express';
import { body } from 'express-validator';
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/project.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin-only routes
router.post(
  '/',
  verifyJWT,
  verifyAdmin,
  [
    body('title').notEmpty().withMessage('Title is required').trim(),
    body('category').notEmpty().withMessage('Category is required').trim(),
    body('description').notEmpty().withMessage('Description is required').trim(),
    body('year').optional().isNumeric().withMessage('Year must be a number'),
    body('featured').optional().isBoolean().withMessage('Featured must be a boolean'),
    body('order').optional().isNumeric().withMessage('Order must be a number')
  ],
  validateRequest,
  createProject
);

router.put(
  '/:id',
  verifyJWT,
  verifyAdmin,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty').trim(),
    body('category').optional().notEmpty().withMessage('Category cannot be empty').trim(),
    body('description').optional().notEmpty().withMessage('Description cannot be empty').trim(),
    body('year').optional().isNumeric().withMessage('Year must be a number'),
    body('featured').optional().isBoolean().withMessage('Featured must be a boolean'),
    body('order').optional().isNumeric().withMessage('Order must be a number')
  ],
  validateRequest,
  updateProject
);

router.delete('/:id', verifyJWT, verifyAdmin, deleteProject);

export default router;
