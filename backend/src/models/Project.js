import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  client: {
    type: String,
    trim: true,
    default: ''
  },
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  technologies: {
    type: [String],
    default: []
  },
  videoUrl: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: '' // Can be an image url
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
