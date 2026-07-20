import multer from 'multer';
import ApiError from '../utils/ApiError.js';

// Memory storage holds the file buffer in memory
const storage = multer.memoryStorage();

// File filters to enforce mime types
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Only images are allowed!'), false);
  }
};

const videoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Only videos are allowed!'), false);
  }
};

const multerImage = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: imageFilter
});

const multerVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit for video
  fileFilter: videoFilter
});

// A bulletproof middleware that accepts any field name and maps it to req.file
export const uploadImage = (req, res, next) => {
  multerImage.any()(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return next(new ApiError(400, `Multer error: ${err.message}`));
      }
      return next(err);
    }
    if (!req.files || req.files.length === 0) {
      return next(new ApiError(400, 'No image file uploaded'));
    }
    req.file = req.files[0];
    next();
  });
};

export const uploadVideo = (req, res, next) => {
  multerVideo.any()(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return next(new ApiError(400, `Multer error: ${err.message}`));
      }
      return next(err);
    }
    if (!req.files || req.files.length === 0) {
      return next(new ApiError(400, 'No video file uploaded'));
    }
    req.file = req.files[0];
    next();
  });
};
