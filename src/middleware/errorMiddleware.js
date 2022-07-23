const { statusCode, statusResponse } = require('../utils/httpStatus');

const errorMiddleware = async (error, _req, res, _next) => {
  res
    .status(error.status || statusCode.INTERNAL_SERVER_ERROR)
    .json({ message: error.message || statusResponse.INTERNAL_SERVER_ERROR });
};

module.exports = {
  errorMiddleware,
};
