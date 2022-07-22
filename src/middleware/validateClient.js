const { HttpException } = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');
const { Client } = require('../database/models/index');

const validateClientById = async (req, res, next) => {
  try {
    const { codCliente } = req.body;

    const client = await Client.findOne({
      where: { id: codCliente },
    });

    if (!client) {
      throw new HttpException(statusCode.BAD_REQUEST, 'Client not found. Please, try again.');
    }

    return next();
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

const validateClientLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const client = await Client.findOne({
    where: { email, password },
  });

  if (!client) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Invalid credentials. Please, try again.');
  }

  return next();
};

module.exports = {
  validateClientById,
  validateClientLogin,
};
