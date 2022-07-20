const { check, validationResult } = require('express-validator');
const HttpException = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');
const { Client } = require('../database/models/index');

const validateFieldsLogin = [
  check('email')
    .isEmail()
    .withMessage('Email inválido. Por favor, insira um email válido.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('A senha precisa ter no mínimo 6 dígitos. Por favor, insira uma senha válida.'),
];
const validateRulesLogin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(statusCode.BAD_REQUEST).json({ errors: errors.array() });
  }
  return next();
};

const validateUserExist = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Client.findOne({
      where: { email, password },
    });

    if (!user) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Pessoa usuária não encontrada. Por favor, tente novamente.' });
    }

    return next();
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  validateFieldsLogin,
  validateRulesLogin,
  validateUserExist,
};
