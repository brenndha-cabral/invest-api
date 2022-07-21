const { check, validationResult } = require('express-validator');
const { HttpException } = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');
const { Asset } = require('../database/models/index');
const { calculateCustody } = require('../utils/calculateCustody');

const validateFieldsInvest = [
  check('codCliente')
    .exists()
    .withMessage('"codCliente" is required.')
    .isNumeric()
    .withMessage('"codCliente" be must a number.'),
  check('codAtivo')
    .exists()
    .withMessage('"codAtivo" is required.')
    .isNumeric()
    .withMessage('"codAtivo" be must a number.'),
  check('qtdeAtivo')
    .exists()
    .withMessage('"qtdeAtivo" is required.')
    .isNumeric()
    .withMessage('"qtdeAtivo" be must a number.'),
];
const validateRulesInvest = (req, res, next) => {
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

const validateBuyAsset = async (req, res, next) => {
  try {
    const { codAtivo, qtdeAtivo } = req.body;

    const asset = await Asset.findOne({
      where: { id: codAtivo },
    });

    if (!asset) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Asset not found. Please, try again.' });
    }

    if (Number(qtdeAtivo) > asset.dataValues.quantity) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Asset quantity must be less or equal the available. Please, try again.' });
    }

    return next();
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

const validateSellAsset = async (req, res, next) => {
  try {
    const { codCliente, codAtivo, qtdeAtivo } = req.body;

    const asset = await Asset.findOne({
      where: { id: codAtivo },
    });

    if (!asset) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Asset not found. Please, try again.' });
    }

    const assetCustody = await calculateCustody(codCliente, codAtivo);

    if (Number(qtdeAtivo) > assetCustody) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Asset quantity must be less or equal the available or client does not have this asset. Please, try again.' });
    }

    return next();
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  validateFieldsInvest,
  validateRulesInvest,
  validateBuyAsset,
  validateSellAsset,
};
