const express = require('express');
const {
  getHistory,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory
} = require('../api/HistoryController.cjs');

const router = express.Router();

router.get('/api/note/:noteId/history', getHistory);
router.get('/api/history/:id', getHistoryById);
router.post('/api/history/:noteId', createHistory);
router.patch('/api/history/:id', updateHistory);
router.delete('/api/history/:id', deleteHistory);

module.exports = router;
