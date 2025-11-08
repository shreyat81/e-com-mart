// Error handling middleware

// 404 Not Found handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// General error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    error: {
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  });
};

// Async handler wrapper to catch errors in async routes
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Validation error handler
const validationError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

// Database error handler
const handleDatabaseError = (error) => {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(e => e.message);
    return {
      success: false,
      message: 'Validation Error',
      errors
    };
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return {
      success: false,
      message: `${field} already exists`
    };
  }

  if (error.name === 'CastError') {
    return {
      success: false,
      message: 'Invalid ID format'
    };
  }

  return {
    success: false,
    message: 'Database error',
    error: error.message
  };
};

// Request logger middleware
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = {
  notFound,
  errorHandler,
  asyncHandler,
  validationError,
  handleDatabaseError,
  requestLogger
};
