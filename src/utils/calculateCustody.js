const sequelize = require('sequelize');
const { Order } = require('../database/models/index');

const calculateCustody = async (clientId, assetId) => {
  let [buyOrders, sellOrders] = await Order.findAll({
    attributes: ['type', [sequelize.fn('sum', sequelize.col('quantity')), 'quantity']],
    where: { clientId, assetId },
    group: ['type'],
  });

  buyOrders = (buyOrders) ? Number(buyOrders.dataValues.quantity) : 0;
  sellOrders = (sellOrders) ? Number(sellOrders.dataValues.quantity) : 0;

  const quantityAvailable = buyOrders - sellOrders;

  return quantityAvailable;
};

module.exports = {
  calculateCustody,
};
