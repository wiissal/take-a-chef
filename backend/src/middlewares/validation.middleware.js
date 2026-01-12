const ApiError = require("../utils/ApiError");
//validation helper
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validation(req.body);
    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }
    next();
  };
};
module.exports = { validate };