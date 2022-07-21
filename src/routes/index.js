const express = require('express');

const loginRoutes = require('./loginRoute');
const clientRoutes = require('./clientRoutes');
const assetRoutes = require('./assetsRoutes');
const investRoutes = require('./investRoutes');
const balanceRoutes = require('./balanceRoutes');

const router = express.Router();

router.use('/login', loginRoutes);
router.use('/clientes', clientRoutes);
router.use('/ativos', assetRoutes);
router.use('/investimentos', investRoutes);
router.use('/conta', balanceRoutes);

module.exports = router;
