import express from 'express';
import { uploadImageController, uploadVideoController } from '../controllers/upload.controller.js';
import { verifyJWT, verifyAdmin } from '../middleware/auth.js';
import { uploadImage, uploadVideo } from '../middleware/upload.js';

const router = express.Router();

// Protected upload routes (Admin only)
router.post('/image', verifyJWT, verifyAdmin, uploadImage, uploadImageController);
router.post('/video', verifyJWT, verifyAdmin, uploadVideo, uploadVideoController);

export default router;
