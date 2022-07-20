const express = require('express');

const loginRoutes = require('./loginRoute');
const assetRoutes = require('./assetRoutes');

const router = express.Router();

router.use('/login', loginRoutes);
router.use('/investimentos', assetRoutes);

module.exports = router;
