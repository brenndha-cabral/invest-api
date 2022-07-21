const { Client } = require('../database/models');

const balanceUpdateService = async (codClient, value) => {
  const response = await Client.update(
    { balance: value },
    { where: { id: codClient } },
  );

  return response > 0;
};

module.exports = {
  balanceUpdateService,
};
