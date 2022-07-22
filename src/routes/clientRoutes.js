const express = require('express');
const {
  setNewUserController,
  getClientByIdController,
  getAllClientsController,
  deleteClientController,
} = require('../controllers/clientController');
const { validateToken } = require('../middleware/validateToken');

const router = express.Router();

router.post('/', setNewUserController);
router.get('/:id', validateToken, getClientByIdController);
router.get('/', validateToken, getAllClientsController);
router.delete('/me', validateToken, deleteClientController);

module.exports = router;
