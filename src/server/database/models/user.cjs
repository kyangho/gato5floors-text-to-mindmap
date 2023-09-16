const db = require('../db.cjs');

module.exports = db.Model.extend({
  tableName: 'users',
  requireFetch: false,
  hasTimestamps: true,
  notes() {
    return this.hasMany('notes');
  }
});
