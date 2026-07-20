import Review from '../models/Review.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

// SSE Clients Registry
let sseClients = [];

// SSE Endpoint
export const streamReviews = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // Establish stream connection

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  req.on('close', () => {
    sseClients = sseClients.filter(client => client.id !== clientId);
  });
};

// Broadcast function to notify all clients
const broadcastUpdate = (action, data) => {
  const payload = JSON.stringify({ type: 'REFRESH', action, data });
  sseClients.forEach(client => {
    client.res.write(`data: ${payload}\n\n`);
  });
};

// Sanitization utility
const sanitizeText = (text) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// POST /api/reviews
export const createReview = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new ApiError(500, 'Database is not ready');
    }

    const {
      customerName,
      photoUrl,
      email,
      phone,
      instagram,
      service,
      project,
      rating,
      review
    } = req.body;

    if (!customerName || !service || !rating || !review) {
      throw new ApiError(400, 'Customer Name, Service, Rating, and Review text are required');
    }

    const cleanName = sanitizeText(customerName.trim()).substring(0, 100);
    const cleanReview = sanitizeText(review.trim()).substring(0, 1000);
    const cleanService = sanitizeText(service.trim());
    const cleanProject = project ? sanitizeText(project.trim()).substring(0, 100) : '';
    const cleanInstagram = instagram ? sanitizeText(instagram.trim()).substring(0, 50) : '';
    const cleanEmail = email ? sanitizeText(email.trim()).substring(0, 100) : '';
    const cleanPhone = phone ? sanitizeText(phone.trim()).substring(0, 20) : '';

    const newReview = new Review({
      customerName: cleanName,
      photoUrl: photoUrl || '',
      email: cleanEmail,
      phone: cleanPhone,
      instagram: cleanInstagram,
      service: cleanService,
      project: cleanProject,
      rating: Math.min(5, Math.max(1, Number(rating))),
      review: cleanReview,
      status: 'Pending' // Force Pending
    });

    const saved = await newReview.save();

    return res.status(201).json(
      new ApiResponse(201, saved, 'Review submitted successfully. Pending admin approval.')
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/reviews (Public: published only)
export const getPublishedReviews = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({
        success: false,
        message: 'Unable to load customer reviews.'
      });
    }

    // Pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skipIndex = (page - 1) * limit;

    const query = { status: 'Published' };
    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex);

    return res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/reviews (Admin only)
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).json(
      new ApiResponse(200, reviews, 'All reviews fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/reviews/:id/publish
export const publishReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'Published' },
      { new: true }
    );
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }
    broadcastUpdate('PUBLISH', review);
    return res.status(200).json(
      new ApiResponse(200, review, 'Review published successfully')
    );
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/reviews/:id/unpublish
export const unpublishReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'Pending' },
      { new: true }
    );
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }
    broadcastUpdate('UNPUBLISH', review);
    return res.status(200).json(
      new ApiResponse(200, review, 'Review unpublished successfully')
    );
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/reviews/:id/reject
export const rejectReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejected' },
      { new: true }
    );
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }
    broadcastUpdate('REJECT', review);
    return res.status(200).json(
      new ApiResponse(200, review, 'Review rejected successfully')
    );
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/reviews/:id
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }
    broadcastUpdate('DELETE', { id: req.params.id });
    return res.status(200).json(
      new ApiResponse(200, null, 'Review deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
