const express = require('express');
const {
  getAssetByIdController,
  getAllAssetsController,
  setNewAssetController,
  updateAssetController,
  deleteAssetController,
} = require('../controllers/assetControllers');
const {
  getClientWithAssetsByIdController,
} = require('../controllers/clientController');
const {
  validateClientIsAdm,
} = require('../middleware/validateClient');
const {
  validateFieldsAsset,
  validateRulesAsset,
  validateAssetExist,
  validateAssetDelete,
} = require('../middleware/validateAsset');

const router = express.Router();

router.get('/', getAllAssetsController);
router.post('/', validateFieldsAsset, validateRulesAsset, validateClientIsAdm, validateAssetExist, setNewAssetController);
router.put('/:id', validateFieldsAsset, validateRulesAsset, validateClientIsAdm, updateAssetController);
router.get('/:id', getAssetByIdController);
router.get('/clientes/:id', getClientWithAssetsByIdController);
router.delete('/:id', validateAssetDelete, deleteAssetController);

module.exports = router;
