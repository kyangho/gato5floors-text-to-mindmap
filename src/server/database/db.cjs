const knexFile = require('./knexfile.cjs');

const knex = require('knex')(knexFile[process.env.NODE_ENV || 'development']);
const BookshelfUuidColumnPlugin = require('../3rd-party/bookshelf/plugins/uuid-column.cjs');
const BookshelfJsonColumnsPlugin = require('../3rd-party/bookshelf/plugins/json-columns.cjs');
const BookshelfAttributeCastingPlugin = require('../3rd-party/bookshelf/plugins/attribute-casting.cjs');
const BookshelfSoftDeletePlugin = require('../3rd-party/bookshelf/plugins/soft-delete.cjs');
const BookshelfCascadeDeletePlugin = require('../3rd-party/bookshelf/plugins/cascade-delete.cjs');
const BookshelfAttributeVirtual = require('../3rd-party/bookshelf/plugins/attribute-virtual.cjs');

try {
  knex.migrate.latest();
} catch (_error) {}
const db = require('bookshelf')(knex);
db.plugin([
  BookshelfUuidColumnPlugin,
  BookshelfJsonColumnsPlugin,
  BookshelfAttributeCastingPlugin,
  BookshelfSoftDeletePlugin,
  BookshelfCascadeDeletePlugin,
  BookshelfAttributeVirtual
]);

module.exports = db;
