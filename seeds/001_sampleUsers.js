exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('User')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('User').insert([
        {
          id: 1,
          username: 'jack1',
          name: 'jack westbrook',
          email: 'fake@mail.com',
          hashedPassword: '$2a$05$bvIG6Nmid91Mu9RcmmWZfO5HJIMCT8riNW0hEp8f6/FuA2/mhzABC',
          timeCreated: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 2,
          username: 'crazyhorse',
          name: 'ellen degeneres',
          email: 'crazyhorse@mail.com',
          hashedPassword: '$2a$05$bvIG6Nmid91Mu9RcmmWZfO5HJIMCT8riNW0hEp8f6/FuA2/mhzXYZ',
          timeCreated: new Date('2016-06-26 14:26:16 UTC')
        },
        {
          id: 3,
          username: 'bubbles',
          name: 'bubble boy',
          email: 'bubbles@mail.com',
          hashedPassword: '$2a$05$bvIG6Nmid91Mu9RcmmWZfO5HJIMCT8riNW0hEp8f6/FuA2/mhzEND',
          timeCreated: new Date('2016-06-26 14:26:16 UTC')
        }
      ]);
    })
    .then(() => {
      return knex.raw(`SELECT setval('"User_id_seq"', (SELECT MAX(id) FROM "User"))`);
    });
};
