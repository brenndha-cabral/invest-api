const { check, validationResult } = require('express-validator');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');

const validateFieldsLogin = [
  check('email')
    .isEmail()
    .withMessage('Invalid email. Please enter a valid email address.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('The password must be at least 6 digits long. Please enter a valid password.'),
];
const validateRulesLogin = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessage = (errors.array()[0]) ? errors.array()[0].msg : '';

  if (!errors.isEmpty()) {
    throw new HttpException(statusCode.BAD_REQUEST, errorMessage);
  }
  return next();
};

module.exports = {
  validateFieldsLogin,
  validateRulesLogin,
};
