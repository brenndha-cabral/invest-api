const express = require('express');
const {
  setNewUserController,
  setUpdateUserController,
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

router.get('/', validateToken, getAllClientsController);
router.get('/:id', validateToken, getClientByIdController);
router.post('/', validateFieldsNewClient, validateRulesClient, validateClientByEmail, setNewUserController);
router.put('/:id', validateToken, validateFieldsNewClient, validateRulesClient, setUpdateUserController);
router.delete('/:id', validateToken, validateClientDelete, deleteClientController);

module.exports = router;
