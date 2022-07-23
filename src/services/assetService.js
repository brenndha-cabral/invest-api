require('dotenv').config();
const Sequelize = require('sequelize');
const { Asset, Order } = require('../database/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../database/config/config')[env];

const sequelize = new Sequelize(config);

const buyOrSellAssetService = async (codCliente, codAtivo, qtdeAtivo, path) => {
  const asset = await Asset.findOne({
    where: { id: codAtivo },
  });

  let newQuantity;
  let type;

  if (path === '/comprar') {
    newQuantity = Number(asset.quantity) - Number(qtdeAtivo);
    type = 'buy';
  } else {
    newQuantity = Number(asset.quantity) + Number(qtdeAtivo);
    type = 'sell';
  }

  const newOrder = await sequelize.transaction(async (t) => {
    const order = await Order.create({
      clientId: codCliente,
      assetId: codAtivo,
      quantity: qtdeAtivo,
      type,
      value: asset.value,
    }, { transaction: t });

    await Asset.update(
      {
        quantity: newQuantity,
      },
      { where: { id: codAtivo } },
      { transaction: t },
    );

    return order;
  });

  return newOrder;
};

const getAssetByIdService = async (id) => {
  const asset = await Asset.findOne({
    attributes: ['id', 'quantity', 'value'],
    where: { id },
  });

  if (!asset) {
    return null;
  }

  return asset;
};

const getAllAssetsService = async () => {
  const assets = await Asset.findAll();
  if (assets) {
    return assets;
  }

  return null;
};

const getAssetByCodeService = async (code) => {
  const asset = await Asset.findOne({
    where: { code },
  });

  if (asset) {
    return asset;
  }

  return null;
};

const setNewAssetService = async ({
  name, code, quantity, value,
}) => {
  const response = await Asset.create(
    {
      name, code, quantity, value,
    },
  );

  if (response) {
    return response.dataValues.id;
  }

  return null;
};

module.exports = {
  buyOrSellAssetService,
  getAssetByIdService,
  getAllAssetsService,
  setNewAssetService,
  getAssetByCodeService,
};
