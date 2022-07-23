const { calculateAllCustodyHelper } = require('../utils/calculateCustody');
const { generateToken } = require('../utils/jwt');
const { Client } = require('../database/models');

const getClientWithAssetService = async (id) => {
  const wallet = await calculateAllCustodyHelper(id);

  if (wallet) {
    return {
      codClient: Number(id),
      wallet,
    };
  }

  return null;
};

const getBalanceByIdService = async (id) => {
  const client = await Client.findOne({
    where: { id },
  });

  if (client) {
    return {
      codCliente: client.dataValues.id,
      saldo: Number(client.dataValues.balance),
    };
  }

  return null;
};

const getAllClientsService = async () => {
  const clients = await Client.findAll({
    attributes: { exclude: ['password'] },
  });

  if (clients) {
    return clients;
  }

  return null;
};

const getClientByIdService = async (id) => {
  const client = await Client.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });

  if (client) {
    return client;
  }

  return null;
};

const getClientByEmailService = async (email) => {
  const client = await Client.findOne({
    attributes: { exclude: ['password'] },
    where: { email },
  });

  if (client) {
    return client;
  }

  return null;
};

const setNewClientService = async ({
  name, email, password, image, cpf, phone, address,
}) => {
  const client = await Client.create({
    name, email, password, image, cpf, phone, address,
  });

  const jwt = {
    id: client.id,
    name,
    adm: false,
  };

  const token = generateToken(jwt);

  return { token };
};

const removeClientService = async (id) => {
  await Client.destroy({
    where: { id },
  });
};

module.exports = {
  getClientWithAssetService,
  getBalanceByIdService,
  getAllClientsService,
  getClientByIdService,
  getClientByEmailService,
  setNewClientService,
  removeClientService,
};
