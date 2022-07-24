const { check, validationResult } = require('express-validator');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');
const { authToken } = require('../utils/jwt');
const { getAssetByIdService, getAssetByCodeService } = require('../services/assetService');

const validateFieldsAsset = [
  check('name')
    .exists()
    .withMessage('"name" is required.')
    .isString()
    .withMessage('"name" must be a string.'),
  check('code')
    .exists()
    .withMessage('"code" is required.')
    .isString()
    .withMessage('"code" must be a string.'),
  check('quantity')
    .exists()
    .withMessage('"quantity" is required.')
    .isNumeric()
    .withMessage('"quantity" must be a number.'),
  check('value')
    .exists()
    .withMessage('"value" is required.')
    .isNumeric()
    .withMessage('"value" must be a number.'),
];
const validateRulesAsset = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = (errors.array()[0]) ? errors.array()[0].msg : '';

    throw new HttpException(statusCode.BAD_REQUEST, errorMessage);
  }
  return next();
};

const validateAssetExist = async (req, _res, next) => {
  const { code } = req.body;

  const asset = await getAssetByCodeService(code);

  if (asset) {
    throw new HttpException(statusCode.CONFLICT, 'Asset already registered');
  }

  return next();
};

const validateAssetDelete = async (req, _res, next) => {
  const { id } = req.params;
  const reqToken = req.headers.authorization;

  const [, token] = reqToken.split(' ');

  const asset = await getAssetByIdService(id);

  if (!asset) {
    throw new HttpException(statusCode.NOT_FOUND, 'Asset not found. Please, try again.');
  }

  const clientToken = authToken(token);

  if (!clientToken.adm) {
    throw new HttpException(statusCode.UNAUTHORIZED, 'Not authorized to delete this asset. Only admins can delete it.');
  }

  return next();
};

module.exports = {
  validateFieldsAsset,
  validateRulesAsset,
  validateAssetExist,
  validateAssetDelete,
};
