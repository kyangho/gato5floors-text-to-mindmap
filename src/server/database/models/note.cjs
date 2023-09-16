const db = require('../db.cjs');

module.exports = db.Model.extend({
  tableName: 'notes',
  requireFetch: false,
  hasTimestamps: true,
  hidden: ['user_id'],
  history() {
    return this.belongsTo('users');
  }
});
