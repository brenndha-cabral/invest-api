const {
  buyOrSellAssetService,
  getAssetByIdService,
  getAllAssetsService,
  setNewAssetService,
  setUpdateAssetService,
  removeAssetService,
} = require('../services/assetService');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');

const setNewOrderController = async (req, res) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { path } = req;

  const order = await buyOrSellAssetService(codCliente, codAtivo, qtdeAtivo, path);

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

  const createAsset = await setNewAssetService(newAsset);

  if (!createAsset) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, 'Not possible create an asset. Please, try again.');
  }

  return res.status(statusCode.CREATED).json({ message: 'Asset created successfully' });
};

const updateAssetController = async (req, res) => {
  const { id } = req.params;
  const newAsset = req.body;

  const asset = await getAssetByIdService(id);

  if (!asset) {
    throw new HttpException(statusCode.NOT_FOUND, 'Asset not found. Please, try again.');
  }

  const createAsset = await setUpdateAssetService(id, newAsset);

  if (!createAsset) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, 'Not possible update an asset. Please, try again.');
  }

  return res.status(statusCode.CREATED).json({ message: 'Asset updated successfully' });
};

const deleteAssetController = async (req, res) => {
  const { id } = req.params;

  const response = await removeAssetService(id);

  if (response) {
    return res.status(statusCode.NO_CONTENT).end();
  }

  throw new HttpException(statusCode.NOT_FOUND, 'Unable to delete. Please, try again.');
};

module.exports = {
  setNewOrderController,
  getAssetByIdController,
  getAllAssetsController,
  setNewAssetController,
  updateAssetController,
  deleteAssetController,
};
