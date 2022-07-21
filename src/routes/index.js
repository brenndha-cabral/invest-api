const express = require('express');

const loginRoutes = require('./loginRoute');
const clientRoutes = require('./clientRoutes');
const assetRoutes = require('./assetsRoutes');
const investRoutes = require('./investRoutes');

const router = express.Router();

router.use('/login', loginRoutes);
router.use('/clientes', clientRoutes);
router.use('/ativos', assetRoutes);
router.use('/investimentos', investRoutes);

module.exports = router;
