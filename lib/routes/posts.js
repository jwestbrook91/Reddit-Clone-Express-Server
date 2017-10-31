const express = require('express');
const knex = require('../../knex');
const router = express.Router();
const { camelizeKeys } = require('humps');

// GET all posts

router.get('/posts', (req, res, next) => {
  return knex('Post')
    .orderBy('timeCreated')
    .then(post => {
      res.json(camelizeKeys(post));
      res.status(200);
    })
    .catch(err => {
      next(err);
    });
});

// GET post by id

router.get('/posts/:id(\\d+)', (req, res, next) => {
  const id = req.params.id;

  if (isNaN(parseInt(id))) {
    return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
  }
  return knex('Post')
    .where('id', id)
    .first()
    .then(post => {
      if (!post) {
        return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
      }
      res.status(200);
      res.json(camelizeKeys(post));
    })
    .catch(err => {
      next(err);
    });
});


// POST to add a post

router.post('/posts', (req, res, next) => {
  if()
})
