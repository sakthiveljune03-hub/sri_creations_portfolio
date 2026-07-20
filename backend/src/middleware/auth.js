import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.replace('Bearer ', '') 
      : req.cookies?.token; // Fallback to cookies if any
    
    if (!token) {
      return next(new ApiError(401, 'Unauthorized: Access token is missing'));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decodedToken?._id || decodedToken?.id).select('-password');
    
    if (!user) {
      return next(new ApiError(401, 'Unauthorized: Invalid access token'));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, error?.message || 'Unauthorized: Invalid token'));
  }
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    return next(new ApiError(403, 'Forbidden: Admin access only'));
  }
  next();
};
