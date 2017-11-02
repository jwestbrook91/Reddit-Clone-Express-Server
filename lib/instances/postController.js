const EntityController = require('../controllers/EntityController');

module.exports = new EntityController({
  entityName: 'Post',
  entityService: require('./postService'),
  userService: require('./userService')
});




// const express = require('express');
// const knex = require('../../knex');
// const router = express.Router();
// const { camelizeKeys } = require('humps');
//
// // GET all posts
//
// router.get('/posts', (req, res, next) => {
//   return knex('Post')
//     .orderBy('timeCreated')
//     .then(post => {
//       res.json(camelizeKeys(post));
//       res.status(200);
//     })
//     .catch(err => {
//       next(err);
//     });
// });
//
// // GET post by id
//
// router.get('/posts/:id(\\d+)', (req, res, next) => {
//   const id = req.params.id;
//
//   if (isNaN(parseInt(id))) {
//     return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
//   }
//   return knex('Post')
//     .where('id', id)
//     .first()
//     .then(post => {
//       if (!post) {
//         return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
//       }
//       res.status(200);
//       res.json(camelizeKeys(post));
//     })
//     .catch(err => {
//       next(err);
//     });
// });
//
// // POST to add a post
//
// router.post('/posts', (req, res, next) => {
//   return knex('Post')
//     .insert(
//       {
//         userId: req.params.userId,
//         voteCount: req.body.voteCount,
//         title: req.body.title,
//         body: req.body.body,
//         category: req.body.category
//       },
//       '*'
//     )
//     .then(post => {
//       //console.log(Post);
//       res.json(camelizeKeys(post[0]));
//     })
//     .catch(err => {
//       next(err);
//     });
// });
//
// // PATCH to update a post (Only original author can edit)
//
// router.patch('/posts/:id(\\d+)', (req, res, next) => {
//   const id = req.params.id;
//
//   let attributes = {
//     userId: req.body.userId,
//     voteCount: req.body.voteCount,
//     title: req.body.title,
//     body: req.body.body,
//     category: req.body.category
//   };
//
//   if (isNaN(parseInt(id))) {
//     return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
//   }
//   return knex('Post')
//     .where('id', id)
//     .then(post => {
//       if (!post[0]) {
//         return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
//       }
//       return knex('Post').update(attributes, '*').where('id', id);
//     })
//     .then(post => {
//       res.status(200);
//       res.json(camelizeKeys(post[0]));
//     })
//     .catch(err => {
//       next(err);
//     });
// });
//
// // DELETE to remove a post (Only original author can delete)
//
// router.delete('/posts/:id(\\d+)', (req, res, next) => {
//   const id = req.params.id;
//
//   if (isNaN(parseInt(id))) {
//     return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
//   }
//
//   let post;
//
//   return knex('Post')
//     .where('id', id)
//     .first()
//     .then(row => {
//       if (!row) {
//         return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
//       }
//       post = row;
//       delete post.id;
//
//       return knex('Post').del().where('id', id);
//     })
//     .then(() => {
//       res.send(camelizeKeys(post));
//       res.status(200);
//     })
//     .catch(err => {
//       next(err);
//     });
// });
//
// module.exports = router;
