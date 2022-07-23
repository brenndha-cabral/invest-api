const bcrypt = require('bcrypt');
const { Client } = require('../database/models');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');
const { generateToken } = require('../utils/jwt');

const loginService = async (email, password) => {
  const client = await Client.findOne({
    where: { email },
  });

  const passwordHash = bcrypt.compareSync(password, client.password);

  if (!passwordHash) {
    throw new HttpException(statusCode.BAD_REQUEST, 'Invalid credentials. Please, try again.');
  }

  if (client) {
    const token = generateToken(client.dataValues);

    return { token };
  }

  return null;
};

module.exports = {
  loginService,
};
