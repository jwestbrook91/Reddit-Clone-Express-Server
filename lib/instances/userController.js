const express = require('express');
const knex = require('../../knex');
const router = express.Router();
// const { camelizeKeys } = require('humps');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const env = require('../env');

// POST (create) a new user

router.post('/users', (req, res, next) => {
  let email = req.body.email;
  if (!req.body.email) {
    return res.status(400).set('Content-Type', 'text/plain').send('Email must not be blank');
  }

  if (!req.body.password || req.body.password.length < 8) {
    return res.status(400).set('Content-Type', 'text/plain').send('Password must be at least 8 characters long');
  }
  return knex('User')
    .where('email', email)
    .first()
    .then(record => {
      if (!record) {
        return record;
      } else {
        if (record.email === email) {
          return res.status(400).set('Content-Type', 'text/plain').send('Email already exists');
        }
      }
    })
    .then(record => {
      return bcrypt.hash(req.body.password, saltRounds);
    })
    .then(hashed_password => {
      let attributes = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        hashed_password: hashed_password
      };
      return knex('users')
        .insert(attributes, '*')
        .then(users => {
          const user = users[0];
          let token = jwt.sign(
            {
              id: user.id,
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email
            },
            env.JWT_KEY
          );
          res.status(200).cookie('token', token, { httpOnly: true }).json({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
          });
        })
        .catch(err => {
          next(err);
        });
    });
});

module.exports = router;
