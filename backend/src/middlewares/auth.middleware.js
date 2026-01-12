const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const User = require('../models')

//protect routes and verify jwt token
try{
  let token;
   // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token found
    if (!token) {
      return next(new ApiError(401, 'Not authorized, no token provided'));
    }

 // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!req.user) {
      return next(new ApiError(401, 'User not found'));
    }

    next();
  } catch (error) {
    return next(new ApiError(401, 'Not authorized, token failed'));
  }


// Restrict to specific roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, `Role ${req.user.role} is not authorized to access this route`));
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo
};