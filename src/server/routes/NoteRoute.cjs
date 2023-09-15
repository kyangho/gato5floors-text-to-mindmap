const express = require('express');
const {
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  getNotes,
  generateGraph
} = require('../api/NoteController.cjs');

const router = express.Router();

router.get('/api/note', getNotes);
router.get('/api/note/:id', getNoteById);
router.post('/api/note/generate', generateGraph);
router.post('/api/note', createNote);
router.patch('/api/note/:id', updateNote);
router.delete('/api/note/:id', deleteNote);

module.exports = router;
