const knexFile = require('./knexfile.cjs');

const knex = require('knex')(knexFile[process.env.NODE_ENV || 'development']);

const db = require('bookshelf')(knex);

module.exports = db;
