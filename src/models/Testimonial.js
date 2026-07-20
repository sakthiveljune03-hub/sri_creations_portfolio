import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  designation: {
    type: String,
    trim: true,
    default: ''
  },
  review: {
    type: String,
    required: [true, 'Review content is required'],
    trim: true
  },
  profileImage: {
    type: String,
    default: '' // Can be an image url
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 5
  }
}, { 
  timestamps: true 
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
