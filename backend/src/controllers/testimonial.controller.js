import Testimonial from '../models/Testimonial.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// GET /api/testimonials
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.status(200).json(
      new ApiResponse(200, testimonials, 'Testimonials retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

// POST /api/testimonials (public/admin)
export const createTestimonial = async (req, res, next) => {
  try {
    const { 
      clientName, 
      company, 
      designation, 
      review, 
      profileImage, 
      rating,
      email,
      service,
      projectName,
      completionDate,
      instagram,
      confirmGenuine,
      confirmPublish,
      status
    } = req.body;

    if (!clientName || !review) {
      throw new ApiError(400, 'Client name and review are required');
    }

    const testimonial = new Testimonial({
      clientName,
      company,
      designation,
      review,
      profileImage,
      rating: rating ? Number(rating) : 5,
      email,
      service,
      projectName,
      completionDate,
      instagram,
      confirmGenuine,
      confirmPublish,
      status: status || 'approved' // Automatically approve for instant frontend render
    });

    const savedTestimonial = await testimonial.save();

    return res.status(201).json(
      new ApiResponse(201, savedTestimonial, 'Testimonial created successfully')
    );
  } catch (error) {
    next(error);
  }
};

// PUT /api/testimonials/:id (protected)
export const updateTestimonial = async (req, res, next) => {
  try {
    const { 
      clientName, 
      company, 
      designation, 
      review, 
      profileImage, 
      rating,
      email,
      service,
      projectName,
      completionDate,
      instagram,
      confirmGenuine,
      confirmPublish,
      status
    } = req.body;

    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      throw new ApiError(404, 'Testimonial not found');
    }

    if (clientName !== undefined) testimonial.clientName = clientName;
    if (company !== undefined) testimonial.company = company;
    if (designation !== undefined) testimonial.designation = designation;
    if (review !== undefined) testimonial.review = review;
    if (profileImage !== undefined) testimonial.profileImage = profileImage;
    if (rating !== undefined) testimonial.rating = Number(rating);
    if (email !== undefined) testimonial.email = email;
    if (service !== undefined) testimonial.service = service;
    if (projectName !== undefined) testimonial.projectName = projectName;
    if (completionDate !== undefined) testimonial.completionDate = completionDate;
    if (instagram !== undefined) testimonial.instagram = instagram;
    if (confirmGenuine !== undefined) testimonial.confirmGenuine = confirmGenuine;
    if (confirmPublish !== undefined) testimonial.confirmPublish = confirmPublish;
    if (status !== undefined) testimonial.status = status;

    const updatedTestimonial = await testimonial.save();

    return res.status(200).json(
      new ApiResponse(200, updatedTestimonial, 'Testimonial updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

// DELETE /api/testimonials/:id (protected)
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      throw new ApiError(404, 'Testimonial not found');
    }
    return res.status(200).json(
      new ApiResponse(200, null, 'Testimonial deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
