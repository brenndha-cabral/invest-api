const express = require('express');

const loginRoute = require('./loginRoute');

const router = express.Router();

router.use('/login', loginRoute);

module.exports = router;
