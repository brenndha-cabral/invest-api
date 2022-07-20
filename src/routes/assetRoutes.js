const express = require('express');

const { validateFieldsInvest, validateRulesInvest, validateAsset } = require('../middleware/validateAsset');
const { validateClientById } = require('../middleware/validateClient');

const { buyAssetController } = require('../controllers/assetControllers');

const router = express.Router();

router.post('/comprar', validateFieldsInvest, validateRulesInvest, validateClientById, validateAsset, buyAssetController);

module.exports = router;
