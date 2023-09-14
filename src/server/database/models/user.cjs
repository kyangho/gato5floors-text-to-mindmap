const db = require('../db.cjs');

module.exports = db.Model.extend({
  tableName: 'users'
});
