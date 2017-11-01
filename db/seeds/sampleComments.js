
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Comment').del()
    .then(function () {
      // Inserts seed entries
      return knex('Comment').insert([
        {id: 1, postId: 3, commenterId: 4, voteCount: 16, body: 'This is a comment'},
        {id: 2, postId: 6, commenterId: 2, voteCount: 1, body: 'This is a different comment!'},
        {id: 3, postId: 20, commenterId: 11, voteCount: -4, body: 'Number 3 comment here'}
      ]);
    });
};
