const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const {User} = require("../models");

//protect routes and verify jwt token
const protect = async (req, res, next) => {
  try {
    let token;
    console.log(" Authorization Header:", req.headers.authorization);
    // Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log(" Extracted Token:", token);

    // If no token found
    if (!token) {
      return next(new ApiError(401, "Not authorized, no token provided"));
    }
    console.log(" JWT_SECRET exists:", !!process.env.JWT_SECRET);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded successfully:", decoded);

    // Get user from token
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password_hash"] },
    });
    console.log(" User found:", req.user ? "YES" : "NO");
    console.log(" User details:", req.user);
    if (!req.user) {
      console.log(" User not found in database");

      return next(new ApiError(401, "User not found"));
    }
    console.log(" All checks passed, calling next()");

    next();
  } catch (error) {
    console.log(" Error in protect middleware:", error.message);
    console.log("Full error:", error);
    return next(new ApiError(401, "Not authorized, token failed"));
  }
};
// Restrict to specific roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Role ${req.user.role} is not authorized to access this route`
        )
      );
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo,
};
