const express = require('express');
const {
  getAssetByIdController,
  getAllAssetsController,
  setNewAssetController,
} = require('../controllers/assetControllers');
const { getClientWithAssetsByIdController } = require('../controllers/clientController');

const router = express.Router();

router.get('/clientes/:id', getClientWithAssetsByIdController);
router.get('/:id', getAssetByIdController);
router.get('/', getAllAssetsController);
router.post('/', setNewAssetController);

module.exports = router;
