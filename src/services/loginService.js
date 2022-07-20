const { Client } = require('../database/models');
const { generateToken } = require('../utils/jwt');

const loginService = async (email, password) => {
  const { dataValues } = await Client.findOne({
    where: { email, password },
  });

  const token = generateToken(dataValues);

  return { token };
};

module.exports = {
  loginService,
};
