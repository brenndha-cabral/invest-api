const { loginService } = require('../services/loginService');
const { statusCode } = require('../utils/httpStatus');

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const token = await loginService(email, password);

  return res.status(statusCode.OK).json(token);
};

module.exports = {
  loginController,
};
