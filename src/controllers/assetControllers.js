const {
  buyOrSellAssetService,
  getAssetByIdService,
  getAllAssetsService,
  getAssetByCodeService,
  setNewAssetService,
} = require('../services/assetService');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');

const setNewOrderController = async (req, res) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { path } = req;

  const order = await buyOrSellAssetService(codCliente, codAtivo, Number(qtdeAtivo), path);

  if (!order) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, 'Unable to trade an asset. Please, try again.');
  }
  return res.status(statusCode.CREATED).json({ message: 'Order created successfully.' });
};

const getAssetByIdController = async (req, res) => {
  const { id } = req.params;

  const asset = await getAssetByIdService(id);

  if (!asset) {
    throw new HttpException(statusCode.NOT_FOUND, 'Asset not found. Please, try again.');
  }

  const assetObj = {
    codAtivo: asset.id,
    qtdeAtivo: asset.quantity,
    valor: asset.value,
  };

  return res.status(statusCode.OK).json(assetObj);
};

const getAllAssetsController = async (_req, res) => {
  const assets = await getAllAssetsService();

  if (!assets) {
    throw new HttpException(statusCode.NOT_FOUND, 'Assets not found');
  }

  return res.status(statusCode.OK).json(assets);
};

const setNewAssetController = async (req, res) => {
  const newAsset = req.body;

  const asset = await getAssetByCodeService(newAsset.code);

  if (asset) {
    throw new HttpException(statusCode.CONFLICT, 'Asset already registered');
  }

  const createAsset = await setNewAssetService(newAsset);

  if (!createAsset) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, 'Not possible create an asset. Please, try again.');
  }

  return res.status(statusCode.CREATED).json({ message: 'Asset created successfully' });
};

module.exports = {
  setNewOrderController,
  getAssetByIdController,
  getAllAssetsController,
  setNewAssetController,
};
