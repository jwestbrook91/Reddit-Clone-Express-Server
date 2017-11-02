exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Comment')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Comment').insert([
        { id: 1, postId: 3, commenterId: 1, voteCount: 16, body: 'This is a comment' },
        { id: 2, postId: 2, commenterId: 2, voteCount: 1, body: 'This is a different comment!' },
        { id: 3, postId: 1, commenterId: 3, voteCount: -4, body: 'Number 3 comment here' }
      ]);
    })
    .then(() => {
      return knex.raw(`SELECT setval('"Comment_id_seq"', (SELECT MAX(id) FROM "Comment"))`);
    });
};
