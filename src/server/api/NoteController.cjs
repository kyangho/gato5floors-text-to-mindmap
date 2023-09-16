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
    const note = await Note.forge({
      id
    }).save({ name, content, chart }, { method: 'update', patch: true });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.forge({
      id
    }).destroy();
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const generateGraph = async (req, res) => {
  try {
    const { content } = req.body;
    console.log('a');
    const { data } = await axios.post(
      'https://a541-2401-d800-2e50-3b85-af36-2e1d-87b7-436a.ngrok-free.app/v1/generate',
      { note: content }
    );
    res.status(200).json(data);
  } catch (error) {
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
