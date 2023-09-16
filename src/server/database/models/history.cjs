const db = require('../db.cjs');

module.exports = db.Model.extend({
  tableName: 'history',
  requireFetch: false,
  hasTimestamps: true,
  hidden: ['note_id'],
  notes() {
    return this.belongsTo('notes');
  }
});
