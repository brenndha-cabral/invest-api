const { Client } = require('../database/models');

const balanceUpdateService = async (codClient, value, path) => {
  const { dataValues } = await Client.findOne(
    { where: { id: codClient } },
  );

  let updateBalance;

  if (path === '/deposito') {
    updateBalance = dataValues.balance + value;
  } else {
    updateBalance = dataValues.balance - value;
  }

  const update = await Client.update(
    { balance: updateBalance },
    { where: { id: codClient } },
  );

  return update > 0;
};

module.exports = {
  balanceUpdateService,
};
