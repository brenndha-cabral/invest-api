const { check, validationResult } = require('express-validator');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');
const { Client } = require('../database/models/index');

const validateFieldsBalance = [
  check('codCliente')
    .exists()
    .withMessage('"codCliente" is required.')
    .isNumeric()
    .withMessage('"codCliente" must be a number.'),
  check('valor')
    .exists()
    .withMessage('"valor" is required.')
    .isNumeric()
    .withMessage('"valor" must be a number.'),
];
const validateRulesBalance = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = (errors.array()[0]) ? errors.array()[0].msg : '';

    throw new HttpException(statusCode.BAD_REQUEST, errorMessage);
  }
  return next();
};

const validateBalanceDeposit = async (req, _res, next) => {
  const { codCliente, valor } = req.body;

  const client = await Client.findOne({
    where: { id: codCliente },
  });

  if (!client) {
    throw new HttpException(statusCode.NOT_FOUND, 'Client not found. Please, try again.');
  }

  if (valor <= 0) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Value must be greater then zero. Please, try again.');
  }

  return next();
};

const validateBalanceWithdraw = async (req, _res, next) => {
  const { codCliente, valor } = req.body;

  const client = await Client.findOne({
    where: { id: codCliente },
  });

  if (!client) {
    throw new HttpException(statusCode.NOT_FOUND, 'Client not found. Please, try again.');
  }

  if (Number(valor) > client.dataValues.balance || valor <= 0) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Value must be greater then zero and available in balance. Please, try again.');
  }

  return next();
};

const validateHasBalance = async (req, _res, next) => {
  const { codCliente, valor } = req.body;

  const client = await Client.findOne({
    where: { id: codCliente },
  });

  if (!client) {
    throw new HttpException(statusCode.NOT_FOUND, 'Client not found. Please, try again.');
  }

  if (Number(valor) > client.dataValues.balance || valor <= 0) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Value must be greater then zero and available in balance. Please, try again.');
  }

  return next();
};

module.exports = {
  validateFieldsBalance,
  validateRulesBalance,
  validateBalanceDeposit,
  validateBalanceWithdraw,
  validateHasBalance,
};
