const HttpException = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');

const errorMiddleware = async (error, _req, res, _next) => {
  if (error instanceof HttpException) {
    res.status(error.status).json({ message: error.message });
  }
  res.status(statusCode.INTERNAL_SERVER_ERROR)
    .json({ message: statusResponse.INTERNAL_SERVER_ERROR });
};

module.exports = {
  errorMiddleware,
};
