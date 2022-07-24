const bcrypt = require('bcrypt');
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
    where: { adm: false },
  });

  if (clients) {
    return clients;
  }

  return null;
};

const getClientByIdService = async (id) => {
  const client = await Client.findOne({
    attributes: { exclude: ['password'] },
    where: { id, adm: false },
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
  const salt = bcrypt.genSaltSync(10);

  const passwordHash = bcrypt.hashSync(password, salt);

  const client = await Client.create({
    name, email, password: passwordHash, image, cpf, phone, address,
  });

  const jwt = {
    id: client.id,
    name,
    adm: false,
  };

  const token = generateToken(jwt);

  return { token };
};

const setUpdateClientService = async (id, {
  name, email, password, image, cpf, phone, address,
}) => {
  const salt = bcrypt.genSaltSync(10);

  const passwordHash = bcrypt.hashSync(password, salt);

  const response = await Client.update({
    name, email, password: passwordHash, image, cpf, phone, address,
  }, { where: { id } });

  if (response) {
    return response;
  }

  return null;
};

const removeClientService = async (id) => {
  const client = await Client.destroy({
    where: { id },
  });

  return client;
};

module.exports = {
  getClientWithAssetService,
  getBalanceByIdService,
  getAllClientsService,
  getClientByIdService,
  getClientByEmailService,
  setNewClientService,
  setUpdateClientService,
  removeClientService,
};
