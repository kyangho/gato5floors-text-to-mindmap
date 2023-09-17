const db = require('../db.cjs');

module.exports = db.model('queues', {
  tableName: 'queues',
  requireFetch: false,
  hasTimestamps: true
});
