const { Client } = require('../database/models');

const balanceUpdateService = async (codClient, value, path) => {
  const response = await Client.findOne(
    { where: { id: codClient } },
  );

  if (response) {
    let updateBalance;

    if (path === '/deposito') {
      updateBalance = response.balance + value;
    } else {
      updateBalance = response.balance - value;
    }

    const [update] = await Client.update(
      { balance: updateBalance },
      { where: { id: codClient } },
    );

    return update.length > 0;
  }

  return null;
};

module.exports = {
  balanceUpdateService,
};
