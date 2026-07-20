import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // Check if the user is an admin
    if (user.role !== 'Admin') {
      throw new ApiError(403, 'Access denied. Authorized admins only.');
    }

    // Check if the password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Form user object without password
    const adminData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return res.status(200).json(
      new ApiResponse(200, { token, admin: adminData }, 'Login successful')
    );
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return res.status(200).json(
      new ApiResponse(200, user, 'Profile fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};
