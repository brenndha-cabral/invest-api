const { Client } = require('../database/models');

const setBalanceUpdateService = async (codClient, value, path) => {
  const client = await Client.findOne(
    { where: { id: codClient } },
  );

  if (client) {
    let updateBalance;

    if (path === '/deposito') {
      updateBalance = Number(client.balance) + Number(value);
    } else {
      updateBalance = Number(client.balance) - Number(value); // Saque
    }

    const [update] = await Client.update(
      { balance: updateBalance },
      { where: { id: codClient } },
    );
    return update; // Retorna 1 (uma linha alterada)
  }

  return null;
};

module.exports = {
  setBalanceUpdateService,
};
