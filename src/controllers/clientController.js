const { getClientWithAssetService } = require('../services/clientService');
const { HttpException } = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');

const getClientWithAssetsByIdController = async (req, res) => {
  const { id } = req.params;

  const client = await getClientWithAssetService(id);

  return res.status(statusCode.OK).json(client);
};

module.exports = {
  getClientWithAssetsByIdController,
};
