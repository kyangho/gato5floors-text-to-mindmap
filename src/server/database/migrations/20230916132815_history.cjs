exports.up = function (knex) {
  return knex.schema.createTable('history', function (t) {
    t.increments('id').primary().unsigned();
    t.string('note_id').nullable();
    t.string('name').notNullable();
    t.string('content').nullable();
    t.json('mindmap').nullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('history');
};
