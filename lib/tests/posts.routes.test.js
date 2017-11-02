'use strict';

process.env.NODE_ENV = 'test';

const request = require('supertest');
// const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');
const server = require('../../server');
describe(
  'posts routes',
  addDatabaseHooks(() => {
    //
    // GET ALL
    //
    it('GET /posts', done => {
      request(server)
        .get('/posts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(
          200,
          [
            {
              id: 1,
              userId: 2,
              voteCount: 24,
              title: 'C This is a post',
              body: 'Still a post',
              category: 'Funny',
              timeCreated: '2016-06-26T14:26:16.000Z',
              timeModified: '2016-06-26T14:26:16.000Z'
            },
            {
              id: 2,
              userId: 3,
              voteCount: 6,
              title: 'A This is a news post',
              body: 'Still a news post',
              category: 'News',
              timeCreated: '2016-06-30T14:26:16.000Z',
              timeModified: '2016-07-26T13:26:16.000Z'
            },
            {
              id: 3,
              userId: 1,
              voteCount: -7,
              title: 'B This is another post',
              body: 'Hey look, I am a post!',
              category: 'Funny',
              timeCreated: '2016-10-26T08:26:16.000Z',
              timeModified: '2017-06-26T11:26:16.000Z'
            }
          ],
          done
        );
    });

    //
    // GET post by id
    //
    it('GET /posts/:id(\\d+)', done => {
      request(server)
        .get('/posts/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(
          200,
          {
            id: 2,
            userId: 3,
            voteCount: 6,
            title: 'A This is a news post',
            body: 'Still a news post',
            category: 'News',
            timeCreated: '2016-06-30T14:26:16.000Z',
            timeModified: '2016-07-26T13:26:16.000Z'
          },
          done
        );
    });

    //
    // POST
    //
    it('POST /posts', done => {
      request(server)
        .post('/posts')
        .set('Accept', 'application/json')
        .send({
          userId: 2,
          voteCount: 3,
          title: 'This is a test additional post',
          body: 'Post for testing',
          category: 'Funny'
        })
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.timeCreated;
          delete res.body.timeModified;
        })
        .expect(
          201,
          {
            id: 4,
            userId: 2,
            voteCount: 3,
            title: 'This is a test additional post',
            body: 'Post for testing',
            category: 'Funny'
          },
          done
        );
    });

    //
    // PATCH
    //
    it('PATCH /posts/:id(\\d+)', done => {
      request(server)
        .patch('/posts/1')
        .set('Accept', 'application/json')
        .send({
          body: 'I edited this post'
        })
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.timeCreated;
          delete res.body.timeModified;
        })
        .expect(
          200,
          {
            id: 1,
            userId: 2,
            voteCount: 24,
            title: 'C This is a post',
            body: 'I edited this post',
            category: 'Funny'
          },
          done
        );
    });

    //
    // DELETE
    //
    it('DELETE /posts/:id(\\d+)', done => {
      request(server)
        .del('/posts/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.timeCreated;
          delete res.body.timeModified;
        })
        .expect(
          200,
          {
            userId: 2,
            voteCount: 24,
            title: 'C This is a post',
            body: 'Still a post',
            category: 'Funny'
          },
          done
        );
    });
  })
);
