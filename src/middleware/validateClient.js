const { check, validationResult } = require('express-validator');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');
const { Client } = require('../database/models/index');
const { authToken } = require('../utils/jwt');
const { getClientByIdService } = require('../services/clientService');

const validateFieldsNewClient = [
  check('name')
    .exists()
    .withMessage('"name" is required')
    .isString()
    .withMessage('"name" must be a string')
    .isLength({ min: 3 })
    .withMessage('"name" length must be at least 3 characters long'),
  check('email')
    .exists()
    .withMessage('"email" is required')
    .isEmail()
    .withMessage('"email" must be a email'),
  check('password')
    .exists()
    .withMessage('"password" is required')
    .isLength({ min: 6 })
    .withMessage('"password" length must be at least 6 characters long'),
  check('confirmPassword')
    .exists()
    .withMessage('"confirmPassword" is required')
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error('Passwords are not the same. Please, try again.');
      } else {
        return val;
      }
    }),
  check('cpf')
    .exists()
    .withMessage('"cpf" is required')
    .isString()
    .withMessage('"cpf" must be a string')
    .isLength(11)
    .withMessage('"cpf" length must be at 11 characters long'),
  check('image')
    .isString()
    .withMessage('"image" must be a string'),
  check('phone')
    .exists()
    .withMessage('"phone" is required')
    .isString()
    .withMessage('"phone" must be a string')
    .isLength(12)
    .withMessage('"phone" length must be at 12 characters long'),
  check('address')
    .exists()
    .withMessage('"address" is required')
    .isString()
    .withMessage('"address" must be a string'),
];

const validateRulesClient = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = (errors.array()[0]) ? errors.array()[0].msg : '';

    if (errorMessage.includes('required')) {
      throw new HttpException(statusCode.BAD_REQUEST, errorMessage);
    }
    throw new HttpException(statusCode.BAD_REQUEST, errorMessage);
  }
  return next();
};

const validateClientById = async (req, _res, next) => {
  const { codCliente } = req.body;

  const client = await Client.findOne({
    where: { id: codCliente },
  });

  if (!client) {
    throw new HttpException(statusCode.NOT_FOUND, 'Client not found. Please, try again.');
  }

  return next();
};

const validateClientIsAdm = async (req, _res, next) => {
  const token = req.headers.authorization;

  const [, clientToken] = token.split(' ');

  const client = authToken(clientToken);

  if (client.adm !== true) {
    throw new HttpException(statusCode.UNAUTHORIZED, 'Client not authorized to add new asset. Only admins can add new assets.');
  }

  return next();
};

const validateClientByEmail = async (req, _res, next) => {
  const { email } = req.body;

  const client = await Client.findOne({
    where: { email },
  });

  if (client) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Client already exist. Please, try again.');
  }

  return next();
};

const validateClientLogin = async (req, _res, next) => {
  const { email, password } = req.body;

  const client = await Client.findOne({
    where: { email, password },
  });

  if (!client) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Invalid credentials. Please, try again.');
  }

  return next();
};

const validateClientDelete = async (req, _res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const client = await getClientByIdService(id);

  const clientToken = authToken(token);

  if (clientToken.adm !== true || clientToken.id !== id || clientToken.id !== client.id) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Not authorized to delete this client. Only admins or the same client can delete itself.');
  }

  return next();
};

module.exports = {
  validateFieldsNewClient,
  validateRulesClient,
  validateClientIsAdm,
  validateClientByEmail,
  validateClientById,
  validateClientLogin,
  validateClientDelete,
};
