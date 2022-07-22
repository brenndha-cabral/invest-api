const express = require('express');
const { setBalanceUpdateController } = require('../controllers/balanceController');
const { getBalanceByIdController } = require('../controllers/clientController');
const {
  validateFieldsBalance,
  validateRulesBalance,
  validateBalanceDeposit,
  validateBalanceWithdraw,
} = require('../middleware/validateBalance');

const router = express.Router();

router.post('/deposito', validateFieldsBalance, validateRulesBalance, validateBalanceDeposit, setBalanceUpdateController);
router.post('/saque', validateFieldsBalance, validateRulesBalance, validateBalanceWithdraw, setBalanceUpdateController);
router.get('/:id', getBalanceByIdController);

module.exports = router;
