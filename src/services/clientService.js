const { calculateAllCustody } = require('../utils/calculateCustody');
const { Client } = require('../database/models');

const getClientWithAssetService = async (id) => {
  const response = await calculateAllCustody(id);

  return {
    codClient: Number(id),
    wallet: response,
  };
};

const balanceById = async (id) => {
  const { dataValues } = await Client.findOne({
    // attributes: ['id, balance'],
    where: { id },
  });

  return {
    codCliente: dataValues.id,
    saldo: Number(dataValues.balance),
  };
};

module.exports = {
  getClientWithAssetService,
  balanceById,
};
