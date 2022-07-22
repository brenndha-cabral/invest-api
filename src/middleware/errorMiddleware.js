const { statusCode } = require('../utils/httpStatus');

const errorMiddleware = async (error, _req, res, _next) => {
  res
    .status(error.status || statusCode.INTERNAL_SERVER_ERROR)
    .json({ message: error.message || 'Unexpected error. Please, try again' });
};

module.exports = {
  errorMiddleware,
};
