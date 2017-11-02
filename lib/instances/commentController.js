




// const express = require('express');
// const knex = require('../../knex');
// const router = express.Router();
// const { camelizeKeys } = require('humps');
//
// // GET all comments for each post
//
// router.get('/posts/:id(\\d+)/comments', (req, res, next) => {
//   return knex('Comment')
//     .orderBy('voteCount')
//     .then(comment => {
//       res.json(camelizeKeys(comment));
//       res.status(200);
//     })
//     .catch(err => {
//       next(err);
//     });
// });
//
// // POST a new comment on a post
//
// router.post('/posts/comments/:id(\\d+)', (req, res, next) => {
//   return knex('Comment')
//     .insert(
//       {
//         postId: req.params.postId,
//         commenterId: req.params.commenterId,
//         voteCount: req.body.voteCount,
//         body: req.body.body
//       },
//       '*'
//     )
//     .then(comment => {
//       res.json(camelizeKeys(comment[0]));
//     })
//     .catch(err => {
//       next(err);
//     });
// });
//
// // PATCH an update to an existing comment (Only original author can edit)
//
// router.patch('/comments/:id(\\d+)', (req, res, next) => {
//   const id = req.params.id;
//
//   let attributes = {
//     postId: req.params.postId,
//     commenterId: req.params.commenterId,
//     voteCount: req.body.voteCount,
//     body: req.body.body
//   };
//
//   if (isNaN(parseInt(id))) {
//     return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
//   }
//
//   return knex('Comment')
//     .where('id', id)
//     .then(comment => {
//       if (!comment[0]) {
//         return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
//       }
//
//       return knex('Comment').update(attributes, '*').where('id', id);
//     })
//     .then(comment => {
//       res.status(200);
//       res.json(camelizeKeys(comment[0]));
//     })
//     .catch(err => {
//       next(err);
//     });
// });
//
// // DELETE a comment from a post (Only original author can delete)
//
// router.delete('/comments/:id(\\d+)', (req, res, next) => {
//   const id = req.params.id;
//
//   if (isNaN(parseInt(id))) {
//     return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
//   }
//
//   let comment;
//
//   return knex('Comment')
//     .where('id', id)
//     .first()
//     .then(row => {
//       if (!row) {
//         return res.status(404).set('Content-Type', 'text/plain').send('Not Found');
//       }
//       comment = row;
//       delete comment.id;
//
//       return knex('Comment').del().where('id', id);
//     })
//     .then(() => {
//       res.send(camelizeKeys(comment));
//       res.status(200);
//     })
//     .catch(err => {
//       next(err);
//     });
// });
//
// module.exports = router;
