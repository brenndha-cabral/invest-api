const express = require('express');
const { balanceUpdateController } = require('../controllers/balanceController');
const { getBalanceById } = require('../controllers/clientController');
const {
  validateFieldsBalance,
  validateRulesBalance,
  validateBalanceDeposit,
  validateBalanceWithdraw,
} = require('../middleware/validateBalance');

const router = express.Router();

router.post('/deposito', validateFieldsBalance, validateRulesBalance, validateBalanceDeposit, balanceUpdateController);
router.post('/saque', validateFieldsBalance, validateRulesBalance, validateBalanceWithdraw, balanceUpdateController);
router.get('/:id', getBalanceById);

module.exports = router;
