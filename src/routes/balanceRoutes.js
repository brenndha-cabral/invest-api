const express = require('express');
const { balanceUpdateController } = require('../controllers/balanceController');
const { validateFieldsBalance, validateRulesBalance, validateBalanceByClient } = require('../middleware/validateBalance');

const router = express.Router();

router.post('/deposito', validateFieldsBalance, validateRulesBalance, validateBalanceByClient, balanceUpdateController);

module.exports = router;
