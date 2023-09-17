const { default: axios } = require('axios');
const History = require('../database/models/history.cjs');

const getHistory = async (req, res) => {
  const { noteId } = req.params;
  try {
    const history = await History.where({
      note_id: noteId
    }).fetchAll();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await History.where({
      id
    }).fetch();
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const createHistory = async (req, res) => {
  const { noteId } = req.params;
  const { name, content, mindmap } = req.body;
  try {
    const note = await new History().save(
      {
        name,
        content,
        mindmap,
        note_id: noteId
      },
      { method: 'insert' }
    );

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateHistory = async (req, res) => {
  const { id } = req.params;
  const { name, content, mindmap } = req.body;
  try {
    const note = await History.forge({
      id
    }).save({ name, content, mindmap }, { method: 'update', patch: true });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await History.forge({
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
  getHistory,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
  generateGraph
};
