const { loginService } = require('../services/loginService');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const token = await loginService(email, password);

  if (!token) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, 'Unable to login. Please, try again.');
  }

  return res.status(statusCode.OK).json(token);
};

module.exports = {
  loginController,
};
