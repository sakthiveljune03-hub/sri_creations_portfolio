import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error.errors || [], err.stack);
  }

  const response = {
    success: false,
    message: error.message,
    errors: error.errors || []
  };

  // In development, you might want logs
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(error.statusCode).json(response);
};

export default errorHandler;
