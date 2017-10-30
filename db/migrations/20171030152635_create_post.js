exports.up = function(knex) {
  return knex.schema.createTable('Post', table => {
    table.increments();
    table.integer('userId').notNullable().references('User.id').index().onDelete('CASCADE');
    table.integer('voteCount').notNullable().defaultTo(0);
    table.text('title').notNullable();
    table.text('body');
    table.text('category');
    table.timestamp('timeCreated').notNullable().default(knex.fn.now());
    table.timestamp('timeModified');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Post');
};
