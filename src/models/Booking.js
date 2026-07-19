import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please write a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  projectType: {
    type: String,
    trim: true,
    default: ''
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  }
}, { 
  timestamps: true 
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
