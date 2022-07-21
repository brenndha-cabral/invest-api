const { balanceUpdateService } = require('../services/balanceService');
const { HttpException } = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');

const balanceUpdateController = async (req, res) => {
  try {
    const { codCliente, valor } = req.body;

    const response = await balanceUpdateService(codCliente, valor);

    if (!response) {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Not possible update balance. Please, try again.' });
    }
    return res.status(statusCode.CREATED).json({ message: 'Balance updated successfully.' });
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  balanceUpdateController,
};
