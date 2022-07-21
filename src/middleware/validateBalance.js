const { check, validationResult } = require('express-validator');
const { HttpException } = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');
const { Client } = require('../database/models/index');

const validateFieldsBalance = [
  check('codCliente')
    .exists()
    .withMessage('"codCliente" is required.')
    .isNumeric()
    .withMessage('"codCliente" be must a number.'),
  check('valor')
    .exists()
    .withMessage('"valor" is required.')
    .isNumeric()
    .withMessage('"valor" be must a number.'),
];
const validateRulesBalance = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0].msg;

    if (errorMessage.includes('required')) {
      return res.status(statusCode.BAD_REQUEST).json({ message: errorMessage });
    }
    return res.status(statusCode.UNPROCESSABLE_ENTITY).json({ message: errorMessage });
  }
  return next();
};

const validateBalanceDeposit = async (req, res, next) => {
  try {
    const { codCliente, valor } = req.body;

    const client = await Client.findOne({
      where: { id: codCliente },
    });

    if (!client) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Client not found. Please, try again.' });
    }

    if (valor <= 0) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Value must be greater then zero. Please, try again.' });
    }

    return next();
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

const validateBalanceWithdraw = async (req, res, next) => {
  try {
    const { codCliente, valor } = req.body;

    const client = await Client.findOne({
      where: { id: codCliente },
    });

    if (!client) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Client not found. Please, try again.' });
    }

    if (valor > client.dataValues.balance || valor <= 0) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Value must be greater then zero and available in balance. Please, try again.' });
    }

    return next();
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  validateFieldsBalance,
  validateRulesBalance,
  validateBalanceDeposit,
  validateBalanceWithdraw,
};
