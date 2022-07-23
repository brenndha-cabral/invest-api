const express = require('express');
const { validateToken } = require('../middleware/validateToken');
const loginRoutes = require('./loginRoute');
const clientsRoutes = require('./clientsRoutes');
const assetsRoutes = require('./assetsRoutes');
const investRoutes = require('./investRoutes');
const balanceRoutes = require('./balanceRoutes');

const router = express.Router();

router.use('/login', loginRoutes);
router.use('/clientes', clientsRoutes);
router.use('/ativos', validateToken, assetsRoutes);
router.use('/investimentos', validateToken, investRoutes);
router.use('/conta', validateToken, balanceRoutes);

module.exports = router;
