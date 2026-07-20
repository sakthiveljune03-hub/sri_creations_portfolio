import Booking from '../models/Booking.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// POST /api/bookings
export const createBooking = async (req, res, next) => {
  try {
    const { name, email, phone, projectType, message } = req.body;

    if (!name || !email || !message) {
      throw new ApiError(400, 'Name, email, and message are required fields');
    }

    const booking = new Booking({
      name,
      email,
      phone,
      projectType,
      message
    });

    await booking.save();

    // Frontend specifies that this endpoint returns this exact shape
    return res.status(201).json({
      success: true,
      message: 'Booking Submitted Successfully'
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings (protected)
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.status(200).json(
      new ApiResponse(200, bookings, 'Bookings retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};
