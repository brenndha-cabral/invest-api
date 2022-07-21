const express = require('express');
const { getClientWithAssetsByIdController } = require('../controllers/clientController');

const router = express.Router();

router.get('/clientes/:id', getClientWithAssetsByIdController);
router.get('/:id');

module.exports = router;
