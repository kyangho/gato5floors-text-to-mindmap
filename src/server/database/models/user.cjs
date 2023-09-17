const db = require('../db.cjs');

module.exports = db.model('users', {
  tableName: 'users',
  requireFetch: false,
  hasTimestamps: true,
  hidden: ['password', 'token'],
  notes() {
    return this.hasMany('notes');
  }
});
