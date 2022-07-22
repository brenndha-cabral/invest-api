const { loginService } = require('../services/loginService');
const { HttpException } = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginService(email, password);

    if (!token) {
      return res.status(statusCode.OK).json(token);
    }

    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Unable to login. Please, try again.' });
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  loginController,
};
