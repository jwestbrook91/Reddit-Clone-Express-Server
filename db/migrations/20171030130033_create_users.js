exports.up = function(knex) {
  return knex.schema.createTable('User', table => {
    table.increments();
    table.text('username').notNullable().unique();
    table.text('name').notNullable();
    table.text('email').notNullable().unique();
    table.specificType('hashedPassword', 'char(60)').notNullable().defaultTo('');
    table.timestamp('timeCreated').notNullable().default(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('User');
};
