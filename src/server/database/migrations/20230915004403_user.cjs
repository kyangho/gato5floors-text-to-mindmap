exports.up = function (knex) {
  return knex.schema.createTable('users', function (t) {
    t.increments('id').primary().unsigned();
    t.string('username').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
