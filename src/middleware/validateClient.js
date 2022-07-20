const HttpException = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');
const { Client } = require('../database/models/index');

const validateClientById = async (req, res, next) => {
  try {
    const { codCliente } = req.body;

    const user = await Client.findOne({
      where: { id: codCliente },
    });

    if (!user) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Client not found. Please, try again.' });
    }

    return next();
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

const validateClientLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Client.findOne({
      where: { email, password },
    });

    if (!user) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Client not found. Please, try again.' });
    }

    return next();
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  validateClientById,
  validateClientLogin,
};
