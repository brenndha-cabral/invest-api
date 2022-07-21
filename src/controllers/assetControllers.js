const { buyAssetService, sellAssetService } = require('../services/assetService');
const { HttpException } = require('../utils/httpException');
const { statusCode, statusResponse } = require('../utils/httpStatus');

const buyAssetController = async (req, res) => {
  try {
    const { codCliente, codAtivo, qtdeAtivo } = req.body;

    const response = await buyAssetService(codCliente, codAtivo, Number(qtdeAtivo));

    if (!response) {
      return res.status(statusCode.OK).json({ message: 'Not possible buy an asset. Please, try again.' });
    }
    return res.status(statusCode.OK).json({ message: 'Order completed successfully.' });
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

const sellAssetController = async (req, res) => {
  try {
    const { codCliente, codAtivo, qtdeAtivo } = req.body;

    const response = await sellAssetService(codCliente, codAtivo, Number(qtdeAtivo));

    if (!response) {
      return res.status(statusCode.OK).json({ message: 'Not possible sell an asset. Please, try again.' });
    }
    return res.status(statusCode.OK).json({ message: 'Order completed successfully.' });
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  buyAssetController,
  sellAssetController,
};
