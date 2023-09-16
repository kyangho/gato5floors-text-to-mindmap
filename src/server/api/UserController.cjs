const User = require('../database/models/user.cjs');
const { encodeJwt } = require('../utils/jwtToken.cjs');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.where({
      email,
      password
    }).fetch();

    if (user) {
      await User.forge({
        id: user.get('id')
      }).save(
        { token: encodeJwt(user.toJSON()) },
        { method: 'update', patch: true }
      );

      res.status(200).json({
        token: encodeJwt(user.toJSON()),
        tokenType: 'Bearer'
      });
    } else {
      res.status(404).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

const register = async (req, res) => {
  const { name, password, phone, email } = req.body;
  try {
    await new User({
      name,
      password,
      phone,
      email
    }).save();
    res.status(201).json('Success');
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const updateUser = async (req, res) => {
  const { name, password, phone, email } = req.body;
  try {
    const user = await User.forge({
      email
    }).save({ name, password, phone }, { method: 'update', patch: true });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.forge({
      email
    }).destroy();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  login,
  register,
  updateUser,
  deleteUser
};
