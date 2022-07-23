const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');
const { authToken } = require('../utils/jwt');

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new HttpException(statusCode.UNAUTHORIZED, 'Token not found');
  }

  const client = authToken(token);

  if (client) {
    return next();
  }

  throw new HttpException(statusCode.UNAUTHORIZED, 'Token invalid');
};

module.exports = {
  validateToken,
};
