const { loginService } = require('../services/loginService');
const { HttpException } = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginService(email, password);

    return res.status(statusCode.OK).json(token);
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  loginController,
};
