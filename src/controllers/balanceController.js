const { setBalanceUpdateService } = require('../services/balanceService');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');

const setBalanceUpdateController = async (req, res) => {
  const { codCliente, valor } = req.body;

  const { path } = req;

  const balance = await setBalanceUpdateService(codCliente, valor, path);

  if (!balance) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, 'Not possible update balance. Please, try again.');
  }
  return res.status(statusCode.CREATED).json({ message: 'Balance updated successfully.' });
};

module.exports = {
  setBalanceUpdateController,
};
