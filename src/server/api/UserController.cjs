const User = require('../database/models/user.cjs');
const getUsers = async (req, res) => {
  try {
    User.fetchAll().then(users => res.status(200).json(users));
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  const { username } = req.body;
  try {
    new User({
      username
    })
      .save()
      .then(saved => {
        res.status(201).json({ saved });
      });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name, price } = req.body;
  try {
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
