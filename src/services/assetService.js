require('dotenv').config();
const Sequelize = require('sequelize');
const { Asset, Order } = require('../database/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../database/config/config')[env];

const sequelize = new Sequelize(config);

const assetTransactionService = async (codCliente, codAtivo, qtdeAtivo, type) => {
  const { dataValues } = await Asset.findOne({
    where: { id: codAtivo },
  });

  let newQuantity;

  if (type === 'buy') {
    newQuantity = dataValues.quantity - qtdeAtivo;
  } else {
    newQuantity = dataValues.quantity + qtdeAtivo;
  }

  const response = await sequelize.transaction(async (t) => {
    const order = await Order.create({
      clientId: codCliente,
      assetId: codAtivo,
      quantity: qtdeAtivo,
      type,
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
  assetTransactionService,
};
