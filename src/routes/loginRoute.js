const express = require('express');

const { validateFieldsLogin, validateRulesLogin } = require('../middleware/validateLogin');
const { validateClientLogin } = require('../middleware/validateClient');

const { loginController } = require('../controllers/loginController');

const router = express.Router();

router.post('/', validateFieldsLogin, validateRulesLogin, validateClientLogin, loginController);

module.exports = router;
