const express = require('express');

const { validateFieldsLogin, validateRulesLogin, validateUserExist } = require('../middleware/validateLogin');

const { loginController } = require('../controllers/loginController');

const router = express.Router();

router.post('/', validateFieldsLogin, validateRulesLogin, validateUserExist, loginController);

module.exports = router;
