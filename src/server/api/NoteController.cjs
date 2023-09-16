const { default: axios } = require('axios');
const Note = require('../database/models/note.cjs');
const User = require('../database/models/user.cjs');
const { parseJwt } = require('../utils/jwtToken.cjs');

const getNotes = async (req, res) => {
  try {
    const parsedToken = parseJwt(req.headers.authorization);
    const user = await User.where({
      email: parsedToken.email
    }).fetch();
    if (!user) {
      res.status(404).json({ msg: 'Cannot not get notes' });
      return;
    }
    const notes = await Note.where({ user_id: user.get('id') }).fetchAll();

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.where({
      id
    }).fetch();
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const createNote = async (req, res) => {
  const { name, content } = req.body;
  try {
    const parsedToken = parseJwt(req.headers.authorization);
    const user = await User.where({
      email: parsedToken.email
    }).fetch();
    if (!user) {
      res.status(404).json({ msg: 'Cannot not create note' });
      return;
    }

    const note = await new Note({
      name,
      content,
      user_id: user.get('id')
    }).save();

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { name, content, chart } = req.body;
  try {
    const parsedToken = parseJwt(req.headers.authorization);
    const user = await User.where({
      email: parsedToken.email
    }).fetch();
    if (!user) {
      res.status(404).json({ msg: 'Cannot not update note' });
      return;
    }

    const note = await Note.forge({
      id,
      user_id: user.get('id')
    }).save({ name, content, chart }, { method: 'update', patch: true });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const parsedToken = parseJwt(req.headers.authorization);
    const user = await User.where({
      email: parsedToken.email
    }).fetch();

    if (!user) {
      res.status(404).json({ msg: 'Cannot not delete note' });
      return;
    }
    const note = await Note.forge({
      id,
      user_id: user.get('id')
    }).destroy();
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const generateGraph = async (req, res) => {
  try {
    const { content } = req.body;
    const { data } = await axios.post(
      'http://ai.g5t.tech/v1/generate',
      {
        note: content
      },
      { timeout: 30000 }
    );
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  generateGraph
};
