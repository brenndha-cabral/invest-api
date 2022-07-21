const { calculateAllCustody } = require('../utils/calculateCustody');

const getClientWithAssetService = async (id) => {
  const response = await calculateAllCustody(id);

  return {
    codClient: Number(id),
    wallet: response,
  };
};

module.exports = {
  getClientWithAssetService,
};
