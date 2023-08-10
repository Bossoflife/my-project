const ErrorHandler = require("./utils/ErrorHandler");

// ./utils/ErrorHandler.js
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;

module.exports = (err, req, res, next) => {
  const error = { ...err }; // Create a copy of the error object to avoid direct modification

  error.status = err.statusCode || 500;
  error.message = err.message || "Internal server Error";

  // in case of wrong mongoose id error
  if (err.name === "CastError") {
    const message = `Resource not found with this id.. Invalid ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    error = new ErrorHandler(message, 400);
  }

  // Wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your URL is invalid, please try again later`;
    error = new ErrorHandler(message, 400);
  }

  // Jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Your URL has expired, please try again later`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
