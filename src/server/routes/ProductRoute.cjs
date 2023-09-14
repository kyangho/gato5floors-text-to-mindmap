const express = require('express');
const {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsers
} = require('../api/UserController.cjs');

const router = express.Router();

router.get('/products', getUsers);
router.get('/products/:id', getUserById);
router.post('/products', createUser);
router.patch('/products/:id', updateUser);
router.delete('/products/:id', deleteUser);

module.exports = router;
