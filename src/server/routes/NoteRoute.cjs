const express = require('express');
const {
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  fetchManyNotes,
  generateGraph
} = require('../api/NoteController.cjs');

const router = express.Router();

router.get('/api/note', fetchManyNotes);
router.get('/api/note/:id', getNoteById);
router.post('/api/note/generate', generateGraph);
router.post('/api/note', createNote);
router.post('/api/note/update', updateNote);
router.delete('/api/note/:id', deleteNote);

module.exports = router;
