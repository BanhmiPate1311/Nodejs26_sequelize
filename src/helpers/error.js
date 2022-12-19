class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// err: instance của AppError
const handleErrors = (err, req, res, next) => {
  if (!(err instanceof AppError)) {
    err = new AppError(500, err.message);
  }

  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    message,
  });

  // Nếu có các middleware phía sau, gọi next() để có thể đi tới các middleware phía sau
  next();
};

module.exports = {
  AppError,
  handleErrors,
};
