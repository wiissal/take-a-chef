const ApiError = require ('../utils/ApiError');

const logger = require('../config/logger');

//not found error handler
const notFound = ( req, res, next)=>{
  const error = new ApiError(404, `Route not found- ${req.originalUrl}`);
  next (error);
};

//global error handler
const errorHandler = (err, req, res, next)=>{
  let { statusCode , message} = err;

  // Log error
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      error: err 
    })
  });
};

module.exports = {
  notFound,
  errorHandler
};