const express = require('express');

const {
  validateFieldsInvest,
  validateRulesInvest,
  validateBuyAsset,
  validateSellAsset,
} = require('../middleware/validateAsset');
const { validateClientById } = require('../middleware/validateClient');

const { setNewOrderController } = require('../controllers/assetControllers');

const router = express.Router();

router.post('/comprar', validateFieldsInvest, validateRulesInvest, validateClientById, validateBuyAsset, setNewOrderController);
router.post('/vender', validateFieldsInvest, validateRulesInvest, validateClientById, validateSellAsset, setNewOrderController);

module.exports = router;
