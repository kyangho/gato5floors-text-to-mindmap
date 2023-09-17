const db = require('../db.cjs');

module.exports = db.model('notes', {
  tableName: 'notes',
  requireFetch: false,
  hasTimestamps: true,
  hidden: ['user_id'],
  users() {
    return this.belongsToMany('users');
  },
  history() {
    return this.hasMany('history');
  }
});
