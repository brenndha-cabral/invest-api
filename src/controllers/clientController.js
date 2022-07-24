const {
  getClientWithAssetService,
  getBalanceByIdService,
  getAllClientsService,
  getClientByIdService,
  getClientByEmailService,
  setNewClientService,
  removeClientService,
} = require('../services/clientService');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');

const getClientWithAssetsByIdController = async (req, res) => {
  const { id } = req.params;

  const client = await getClientWithAssetService(id);

  if (!client) {
    throw new HttpException(statusCode.NOT_FOUND, 'Client not found. Please, try again.');
  }

  return res.status(statusCode.OK).json(client);
};

const getBalanceByIdController = async (req, res) => {
  const { id } = req.params;

  const balance = await getBalanceByIdService(id);

  if (!balance) {
    throw new HttpException(statusCode.NOT_FOUND, 'Balance not found. Please, try again.');
  }

  return res.status(statusCode.OK).json(balance);
};

const getAllClientsController = async (req, res) => {
  const clients = await getAllClientsService();

  if (!clients.length > 0) {
    throw new HttpException(statusCode.NOT_FOUND, 'Clients not found. Please, try again.');
  }

  return res.status(statusCode.OK).json(clients);
};

const getClientByIdController = async (req, res) => {
  const { id } = req.params;

  const client = await getClientByIdService(id);

  if (!client) {
    throw new HttpException(statusCode.NOT_FOUND, 'Client not found. Please, try again.');
  }

  return res.status(statusCode.OK).json(client);
};

const setNewUserController = async (req, res) => {
  const newClient = req.body;

  const client = await getClientByEmailService(newClient.email);

  if (client) {
    throw new HttpException(statusCode.CONFLICT, 'Client already registered.');
  }

  const token = await setNewClientService(newClient);

  return res.status(statusCode.CREATED).json(token);
};

const deleteClientController = async (req, res) => {
  const { id } = req.params;

  const client = await getClientByIdService(id);

  if (!client) {
    throw new HttpException(statusCode.NOT_FOUND, 'Client not found. Please, try again.');
  }

  const response = await removeClientService(id);

  if (response) {
    return res.status(statusCode.NO_CONTENT);
  }

  throw new HttpException(statusCode.NOT_FOUND, 'Unable to delete. Please, try again.');
};

module.exports = {
  getClientWithAssetsByIdController,
  getBalanceByIdController,
  getAllClientsController,
  getClientByIdController,
  setNewUserController,
  deleteClientController,
};
