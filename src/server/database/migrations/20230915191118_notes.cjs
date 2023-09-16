exports.up = function (knex) {
  return knex.schema.createTable('notes', function (t) {
    t.increments('id').primary().unsigned();
    t.string('name').notNullable();
    t.integer('user_id').notNullable();
    t.string('content').nullable();
    t.text('chart').nullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notes');
};
