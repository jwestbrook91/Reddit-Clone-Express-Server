exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Post')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Post').insert([
        {
          id: 1,
          userId: 2,
          voteCount: 24,
          title: 'C This is a post',
          body: 'Still a post',
          category: 'Funny',
          timeCreated: new Date('2016-06-26 14:26:16 UTC'),
          timeModified: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 2,
          userId: 3,
          voteCount: 6,
          title: 'A This is a news post',
          body: 'Still a news post',
          category: 'News',
          timeCreated: new Date('2016-06-30 14:26:16 UTC'),
          timeModified: new Date('2016-07-26 13:26:16 UTC')
        },
        {
          id: 3,
          userId: 1,
          voteCount: -7,
          title: 'B This is another post',
          body: 'Hey look, I am a post!',
          category: 'Funny',
          timeCreated: new Date('2016-10-26 08:26:16 UTC'),
          timeModified: new Date('2017-06-26 11:26:16 UTC')
        }
      ]);
    })
    .then(() => {
      return knex.raw(`SELECT setval('"Post_id_seq"', (SELECT MAX(id) FROM "Post"))`);
    });
};
