const { Client } = require('../database/models');
const { generateToken } = require('../utils/jwt');

const loginService = async (email, password) => {
  const response = await Client.findOne({
    where: { email, password },
  });

  if (response) {
    const token = generateToken(response);

    return { token };
  }

  return null;
};

module.exports = {
  loginService,
};
