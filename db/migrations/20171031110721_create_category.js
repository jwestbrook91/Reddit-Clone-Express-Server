exports.up = function(knex) {
  return knex.schema.createTable('Category', table => {
    table.increments();
    table.integer('postId').notNullable().references('Post.id').index().onDelete('CASCADE');
    table.text('type').notNullable().defaultTo('General');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Category');
};
