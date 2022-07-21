const express = require('express');

const {
  validateFieldsInvest,
  validateRulesInvest,
  validateBuyAsset,
  validateSellAsset,
} = require('../middleware/validateAsset');
const { validateClientById } = require('../middleware/validateClient');

const { buyAssetController, sellAssetController } = require('../controllers/assetControllers');

const router = express.Router();

router.post('/comprar', validateFieldsInvest, validateRulesInvest, validateClientById, validateBuyAsset, buyAssetController);
router.post('/vender', validateFieldsInvest, validateRulesInvest, validateSellAsset, sellAssetController);

module.exports = router;
