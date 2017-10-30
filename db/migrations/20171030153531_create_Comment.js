exports.up = function(knex) {
  return knex.schema.createTable('Comment', table => {
    table.increments();
    table.integer('postId').notNullable().references('Post.id').index().onDelete('CASCADE');
    table.integer('commenterId').notNullable().references('User.id').index().onDelete('CASCADE');
    table.integer('voteCount').notNullable().defaultTo(0);
    table.text('body').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Comment');
};
