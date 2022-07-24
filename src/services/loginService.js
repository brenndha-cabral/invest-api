const bcrypt = require('bcrypt');
const { Client } = require('../database/models');
const { HttpException } = require('../utils/httpException');
const { statusCode } = require('../utils/httpStatus');
const { generateToken } = require('../utils/jwt');

const loginService = async (email, password) => {
  const client = await Client.findOne({
    where: { email },
  });

  if (client) {
    const passwordHash = bcrypt.compareSync(password, client.password);

    if (!passwordHash) {
      throw new HttpException(statusCode.BAD_REQUEST, 'Invalid credentials. Please, try again.');
    }
    const token = generateToken(client.dataValues);

    return { token };
  }

  throw new HttpException(statusCode.BAD_REQUEST, 'Invalid credentials. Please, try again.');
};

module.exports = {
  loginService,
};
