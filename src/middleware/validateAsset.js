const { check, validationResult } = require('express-validator');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');
const { Asset, Client } = require('../database/models/index');
const { calculateCustodyByIdHelper } = require('../utils/calculateCustody');

const validateFieldsInvest = [
  check('codCliente')
    .exists()
    .withMessage('"codCliente" is required.')
    .isNumeric()
    .withMessage('"codCliente" must be a number.'),
  check('codAtivo')
    .exists()
    .withMessage('"codAtivo" is required.')
    .isNumeric()
    .withMessage('"codAtivo" must be a number.'),
  check('qtdeAtivo')
    .exists()
    .withMessage('"qtdeAtivo" is required.')
    .isNumeric()
    .withMessage('"qtdeAtivo" must be a number.'),
];
const validateRulesInvest = (req, _res, next) => {
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

const validateBuyAsset = async (req, _res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;

  const asset = await Asset.findOne({
    where: { id: codAtivo },
  });

  const client = await Client.findOne({
    where: { id: codCliente },
  });

  if (!asset) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Asset not found. Please, try again.');
  }

  if (Number(qtdeAtivo) > asset.quantity) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Asset quantity must be less or equal the available. Please, try again.');
  }

  if ((asset.value * Number(qtdeAtivo)) > client.balance) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Client does not have sufficient balance for the transaction. Please, try again.');
  }
  return next();
};

const validateSellAsset = async (req, _res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;

  const asset = await Asset.findOne({
    where: { id: codAtivo },
  });

  if (!asset) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Asset not found. Please, try again.');
  }

  const assetCustody = await calculateCustodyByIdHelper(codCliente, codAtivo);

  if (Number(qtdeAtivo) > assetCustody) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Asset quantity must be less or equal the available or client does not have this asset. Please, try again.');
  }

  return next();
};

module.exports = {
  validateFieldsInvest,
  validateRulesInvest,
  validateBuyAsset,
  validateSellAsset,
};
