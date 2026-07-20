import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import reviewRoutes from './routes/review.routes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Security HTTP headers
app.use(helmet());

// Enable request compression
app.use(compression());

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// CORS setup - restricted to CLIENT_URL
// CORS setup - support multiple allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://10.33.65.209:3000',
  'https://sri-creations.vercel.app',
  'https://sri-creations-portfolio.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    // Also check if matches custom CLIENT_URL env variable
    if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Express preflight response for OPTIONS requests
app.options('*', cors());

// Body Parsers
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use(generalLimiter);

// Specific rate limit for login endpoint
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit to 15 login attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
  }
});
app.use('/api/auth/login', loginLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/upload', uploadRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date()
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Cinematic Portfolio Backend API'
  });
});

// Fallback route not found handler
app.use('*', (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.originalUrl} on this server`
  });
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
