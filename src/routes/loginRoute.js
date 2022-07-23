const express = require('express');

const { validateFieldsLogin, validateRulesLogin } = require('../middleware/validateLogin');

const { loginController } = require('../controllers/loginController');

const router = express.Router();

router.post('/', validateFieldsLogin, validateRulesLogin, loginController);

module.exports = router;
