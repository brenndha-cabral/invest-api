const { getClientWithAssetService, balanceById } = require('../services/clientService');
// const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');

const getClientWithAssetsByIdController = async (req, res) => {
  const { id } = req.params;

  const client = await getClientWithAssetService(id);

  return res.status(statusCode.OK).json(client);
};

const getBalanceById = async (req, res) => {
  const { id } = req.params;

  const response = await balanceById(id);

  return res.status(statusCode.OK).json(response);
};

module.exports = {
  getClientWithAssetsByIdController,
  getBalanceById,
};
