const sequelize = require('sequelize');
const { Order } = require('../database/models/index');

const calculateCustodyByIdHelper = async (clientId, assetId) => {
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

const calculateAllCustodyHelper = async (clientId) => {
  const order = await Order.findAll({
    attributes: ['type', 'asset_id', 'value', [sequelize.fn('sum', sequelize.col('quantity')), 'quantity']],
    where: { client_id: clientId },
    group: ['asset_id', 'type', 'value'],
  });

  const assetCustody = order.reduce((acc, curr) => {
    let qtd;

    if (acc[curr.asset_id]) {
      qtd = (curr.type === 'buy')
        ? acc[curr.asset_id][0] + Number(curr.quantity) // A posição zero é sempre a chave qtd
        : acc[curr.asset_id][0] - Number(curr.quantity); // Como na linha 41
    } else {
      qtd = (curr.type === 'buy') ? Number(curr.quantity) : -Number(curr.quantity);
      // Aqui adiciona um valor inicial pois no primeiro loop não existe.
      // A segunda opção é um cenário pouco provável mas o primeiro obj pode ser do tipo sell,
      // então seria negativo pois existiria uma venda sem uma compra anterior
    }

    acc[curr.asset_id] = [
      qtd,
      curr.value,
    ];

    // Saída:
    // const acc = {
    //   3: [5, 10],
    //   7: [29, 12],
    // };

    return acc;
  }, {});

  const custodyKeys = Object.keys(assetCustody); // ['3', '7']

  // Aqui lupa pelo array e monta o objeto de acordo com as posições,
  // pega a quantity do reduce na posição do id(3 || 7) e na posição zero pois é da linha 41
  // pega o value do reduce na posição do id(3 || 7) e na posição um é da linha 42
  const custody = custodyKeys.map((id) => (
    {
      codAtivo: Number(id),
      qtdeAtivo: Number(assetCustody[id][0]),
      valor: Number(assetCustody[id][1]),
    }));

  return custody;

  // Saída para o id do cliente 1:
  // [
  //   {
  //     codAtivo: 3,
  //     qtdeAtivo: 5,
  //     valor: 389.7,
  //   },
  //   {
  //     codAtivo: 7,
  //     qtdeAtivo: 19,
  //     valor: 28.71,
  //   },
  // ],
};

module.exports = {
  calculateCustodyByIdHelper,
  calculateAllCustodyHelper,
};
