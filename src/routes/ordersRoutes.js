const express = require('express');

const {
  validateFieldsOrder,
  validateRulesOrder,
  validateBuyAsset,
  validateSellAsset,
} = require('../middleware/validateOrder');
const { validateClientById } = require('../middleware/validateClient');

const { setNewOrderController } = require('../controllers/assetControllers');

const router = express.Router();

router.post('/comprar', validateFieldsOrder, validateRulesOrder, validateClientById, validateBuyAsset, setNewOrderController);
router.post('/vender', validateFieldsOrder, validateRulesOrder, validateClientById, validateSellAsset, setNewOrderController);

module.exports = router;
