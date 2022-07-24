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
  validateClientDelete,
} = require('../middleware/validateClient');
const { validateToken } = require('../middleware/validateToken');

const router = express.Router();

router.post('/', validateFieldsNewClient, validateRulesClient, validateClientByEmail, setNewUserController);
router.get('/', validateToken, getAllClientsController);
router.get('/:id', validateToken, getClientByIdController);
router.delete('/:id', validateToken, validateClientDelete, deleteClientController);

module.exports = router;
