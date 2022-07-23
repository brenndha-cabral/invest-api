const express = require('express');
const {
  setNewUserController,
  getClientByIdController,
  getAllClientsController,
  deleteClientController,
} = require('../controllers/clientController');
const {
  validateFieldsNewClient,
  validateRulesClient,
  validateClientByEmail,
} = require('../middleware/validateClient');
const { validateToken } = require('../middleware/validateToken');

const router = express.Router();

router.post('/', validateFieldsNewClient, validateRulesClient, validateClientByEmail, setNewUserController);
router.get('/:id', validateToken, getClientByIdController);
router.get('/', validateToken, getAllClientsController);
router.delete('/me', validateToken, deleteClientController);

module.exports = router;
