require('dotenv').config();
const Sequelize = require('sequelize');
const { Client, AccountOperation } = require('../database/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../database/config/config')[env];

const sequelize = new Sequelize(config);

const setBalanceUpdateService = async (codClient, value, path) => {
  const newBalance = await sequelize.transaction(async (t) => {
    const client = await Client.findOne(
      { where: { id: codClient } },
    );

    let updatedBalance;
    let type;

    if (path === '/deposito') {
      updatedBalance = Number(client.balance) + Number(value);
      type = 'deposit';
    } else if (path === '/saque') {
      updatedBalance = Number(client.balance) - Number(value);
      type = 'withdraw';
    }

    const operation = await AccountOperation.create({
      client_id: client.id,
      amount: value,
      type,
    }, { transaction: t });

    await Client.update(
      { balance: updatedBalance },
      { where: { id: codClient } },
    );

    return operation;
  });

  return newBalance;
};

module.exports = {
  setBalanceUpdateService,
};
