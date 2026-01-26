const morgan = require('morgan');
const logger = require('../config/logger');

// Custom token for Morgan to use Winston
const stream = {
  write: (message) => logger.http(message.trim()),
};

// Skip logging during tests
const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'test';
};

// Morgan middleware with custom format
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

module.exports = morganMiddleware;