require('dotenv').config();
const Sequelize = require('sequelize');
const { Asset, Order } = require('../database/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../database/config/config')[env];

const sequelize = new Sequelize(config);

const buyAssetService = async (codCliente, codAtivo, qtdeAtivo) => {
  const { dataValues } = await Asset.findOne({
    where: { id: codAtivo },
  });

  const newQuantity = dataValues.quantity - qtdeAtivo;

  const response = await sequelize.transaction(async (t) => {
    const order = await Order.create({
      clientId: codCliente,
      assetId: codAtivo,
      quantity: qtdeAtivo,
      type: 'buy',
      value: dataValues.value,
    }, { transaction: t });

    await Asset.update(
      { quantity: newQuantity },
      { where: { id: codAtivo } },
      { transaction: t },
    );

    return order;
  });

  return response;
};

module.exports = {
  buyAssetService,
};
