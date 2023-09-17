const db = require('../db.cjs');

module.exports = db.model('history', {
  tableName: 'history',
  requireFetch: false,
  hasTimestamps: true,
  notes() {
    return this.belongsToMany('notes');
  }
});
