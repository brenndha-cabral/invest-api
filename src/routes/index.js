const express = require('express');
const { validateToken } = require('../middleware/validateToken');
const loginRoutes = require('./loginRoute');
const clientRoutes = require('./clientRoutes');
const assetRoutes = require('./assetsRoutes');
const investRoutes = require('./investRoutes');
const balanceRoutes = require('./balanceRoutes');

const router = express.Router();

router.use('/login', loginRoutes);
router.use('/clientes', clientRoutes);
router.use('/ativos', validateToken, assetRoutes);
router.use('/investimentos', validateToken, investRoutes);
router.use('/conta', validateToken, balanceRoutes);

module.exports = router;
