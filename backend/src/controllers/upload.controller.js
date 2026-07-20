import cloudinary from '../config/cloudinary.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// Helper function to upload buffer stream to Cloudinary
const uploadStreamToCloudinary = (fileBuffer, resourceType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'cinematic_portfolio',
        resource_type: resourceType
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// POST /api/upload/image (protected)
export const uploadImageController = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No image file provided');
    }

    const result = await uploadStreamToCloudinary(req.file.buffer, 'image');

    // To ensure compatibility with direct root extraction or standard data wrapper,
    // we return keys in both root and data block.
    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.secure_url,
        public_id: result.public_id
      },
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    next(new ApiError(500, `Cloudinary Image upload failed: ${error.message}`));
  }
};

// POST /api/upload/video (protected)
export const uploadVideoController = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No video file provided');
    }

    const result = await uploadStreamToCloudinary(req.file.buffer, 'video');

    return res.status(200).json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        url: result.secure_url,
        public_id: result.public_id
      },
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    next(new ApiError(500, `Cloudinary Video upload failed: ${error.message}`));
  }
};
