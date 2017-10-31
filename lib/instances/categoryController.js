const express = require('express');
const knex = require('../../knex');
const router = express.Router();
const { camelizeKeys } = require('humps');

// GET all categories

router.get('/categories', (req, res, next) => {
  return knex('Category')
    .then(category => {
      res.json(camelizeKeys(category));
      res.status(200);
    })
    .catch(err => {
      next(err);
    });
});

// GET all posts by category

router.get('/:category/posts', (req, res, next) => {});
