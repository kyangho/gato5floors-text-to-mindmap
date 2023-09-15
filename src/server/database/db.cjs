const knexFile = require('./knexfile.cjs');

const knex = require('knex')(knexFile[process.env.NODE_ENV || 'development']);
try {
  knex.migrate.latest();
} catch (_error) {}
const db = require('bookshelf')(knex);

module.exports = db;
