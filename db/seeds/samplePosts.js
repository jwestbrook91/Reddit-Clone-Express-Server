exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('POST').del().then(function() {
    // Inserts seed entries
    return knex('POST').insert([
      {
        id: 1,
        userId: 2,
        voteCount: 24,
        title: 'This is a post',
        body: 'Still a post',
        category: 'Funny',
        timeCreated: new Date('2016-06-26 14:26:16 UTC'),
        timeModified: new Date('2016-06-26 14:26:16 UTC')
      },
      {
        id: 2,
        userId: 2,
        voteCount: 24,
        title: 'This is a post',
        body: 'Still a post',
        category: 'Funny',
        timeCreated: new Date('2016-06-26 14:26:16 UTC'),
        timeModified: new Date('2016-06-26 14:26:16 UTC')
      },
      { id: 3, colName: 'rowValue3' }
    ]);
  });
};
