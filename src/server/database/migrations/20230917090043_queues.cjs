exports.up = function (knex) {
  return knex.schema.createTable('queues', function (t) {
    t.string('id').primary().unsigned();
    t.string('status').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('queues');
};
