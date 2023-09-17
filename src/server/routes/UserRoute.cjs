const express = require('express');
const {
  login,
  register,
  updateUser,
  deleteUser
} = require('../api/UserController.cjs');

const router = express.Router();

router.post('/api/user/login', login);
router.post('/api/user/register', register);
router.patch('/api/user/:id', updateUser);
router.delete('/api/user/:id', deleteUser);

module.exports = router;
