const { Client } = require('../database/models');
const { generateToken } = require('../utils/jwt');

const loginService = async (email, password) => {
  const client = await Client.findOne({
    where: { email, password },
  });

  if (client) {
    const token = generateToken(client.dataValues);

    return { token };
  }

  return null;
};

module.exports = {
  loginService,
};
