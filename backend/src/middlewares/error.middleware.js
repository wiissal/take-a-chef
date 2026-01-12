const ApiError = require ('../utils/ApiError');

//not found error handler
const notFound = (req, res, next)=>{
  const error = new ApiError(404, `Route not found- ${req.originalUrl}`);
  next (error);
};

//global error handler
const errorHandler = (err, req, res, next)=>{
  let { statusCode , message} = err;

  //default to 500 if no status code
  if(!statusCode){
    statusCode = 500;
  }

  //dev environment - sending full error
  if(Process.env.NODE_ENV ==='development'){
    res.status(statusCode).json({
 success: false,
      status: statusCode,
      message: message,
      stack: err.stack,
      error: err
    });
  }else {
    //production env send minimal error
    res.status(statusCode).json({
      success: false,
      status: statusCode,
      message: message
    });
  }
};
module.exports = {
  notFound,
  errorHandler
};