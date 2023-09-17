const { default: axios } = require('axios');
const Note = require('../database/models/note.cjs');
const User = require('../database/models/user.cjs');
const History = require('../database/models/history.cjs');

const { parseJwt } = require('../utils/jwtToken.cjs');
const { last, find } = require('lodash');
const Springy = require('../utils/springy.cjs');

const fetchManyNotes = async (req, res) => {
  try {
    const parsedToken = parseJwt(req.headers.authorization);
    const user = await User.where({
      email: parsedToken.email
    }).fetch();
    if (!user) {
      res.status(404).json({ msg: 'Cannot not get notes' });
      return;
    }

    const notes = await Note.where({ user_id: user.get('id') }).fetchAll({
      withRelated: ['history']
    });
    res.status(200).json(notes.toJSON());
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const parsedToken = parseJwt(req.headers.authorization);
    const user = await User.where({
      email: parsedToken.email
    }).fetch();

    if (!user) {
      res.status(404).json({ msg: 'Cannot not create note' });
      return;
    }

    const { id, historyId } = req.params;

    let note = await Note.where({
      id,
      user_id: user.get('id')
    }).fetch({ withRelated: ['history'] });

    let history = find(note.related('history').toJSON(), { id: historyId });
    if (history) {
      note = {
        ...note.toJSON(),
        historyId: history.id,
        content: history.content,
        mindmap: history.mindmap,
        name: history.name
      };
    } else {
      history = last(note.related('history').toJSON());
      note = {
        ...note.toJSON(),
        historyId: history.id,
        content: history.content,
        mindmap: history.mindmap,
        name: history.name
      };
    }

    res.status(200).json(note);
  } catch (error) {
    console.log(error);
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

    const history = await History.forge({
      name,
      content
    }).save();

    const note = await Note.forge({
      user_id: user.get('id'),
      history_id: history.get('id')
    }).save();

    history.save(
      {
        note_id: note.get('id')
      },
      { method: 'update', patch: true }
    );

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateNote = async (req, res) => {
  const { name, content, mindmap, noteId, historyId } = req.body;
  try {
    const parsedToken = parseJwt(req.headers.authorization);

    const user = await User.where({
      email: parsedToken.email
    }).fetch();

    if (!user) {
      res.status(404).json({ msg: 'Cannot not update note' });
      return;
    }

    const note = await Note.where({
      id: noteId,
      user_id: user.get('id')
    }).fetch();

    if (!note) {
      res.status(404).json({ msg: 'Cannot find note' });
      return;
    }

    const history = await History.forge({
      id: historyId,
      note_id: note.get('id')
    }).save({ name, content, mindmap }, { method: 'update', patch: true });

    res.status(201).json(history);
  } catch (error) {
    console.log(error);
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
    const note = await Note.where({
      id,
      user_id: user.get('id')
    }).fetch({ withRelated: ['history'] });

    note.destroy();
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const generateGraph = async (req, res) => {
  try {
    const { content, id, historyId } = req.body;
    const { data } = await axios.post(
      'http://ai.g5t.tech/v1/generate',
      {
        note: content
      },
      { timeout: 30000 }
    );

    const parsedToken = parseJwt(req.headers.authorization);

    const user = await User.where({
      email: parsedToken.email
    }).fetch();

    if (!user) {
      res.status(404).json({ msg: 'Cannot not update note' });
      return;
    }

    const note = await Note.where({
      id,
      user_id: user.get('id')
    }).fetch();

    if (!note) {
      res.status(404).json({ msg: 'Cannot find note' });
      return;
    }

    await History.forge({
      id: historyId,
      note_id: note.get('id')
    }).save({ mindmap: data }, { method: 'update', patch: true });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  fetchManyNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  generateGraph
};
