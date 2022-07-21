const express = require('express');
const { assetByIdController } = require('../controllers/assetControllers');
const { getClientWithAssetsByIdController } = require('../controllers/clientController');

const router = express.Router();

router.get('/clientes/:id', getClientWithAssetsByIdController);
router.get('/:id', assetByIdController);

module.exports = router;
