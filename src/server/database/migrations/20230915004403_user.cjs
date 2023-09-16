exports.up = function (knex) {
  return knex.schema.createTable('users', function (t) {
    t.increments('id').primary().unsigned();
    t.string('email').unique().notNullable();
    t.string('name').notNullable();
    t.string('phone').notNullable();
    t.string('password').notNullable();
    t.string('token').nullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
