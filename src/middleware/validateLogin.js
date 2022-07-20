const { check, validationResult } = require('express-validator');
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

  if (!errors.isEmpty()) {
    return res.status(statusCode.BAD_REQUEST).json({ errors: errors.array() });
  }
  return next();
};

module.exports = {
  validateFieldsLogin,
  validateRulesLogin,
};
