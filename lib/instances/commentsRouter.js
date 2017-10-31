const express = require('express');
const Boom = require('boom');
const router = express.Router();
const commentController = require('./commentController');

// GET all comments

router.get('/posts/:id(\\d+)/comments', commentController.getAllByPostId);
router.post('posts/:id(\\d+)/comments', commentController.create);
router.all('/posts/:id(\\d+)/comments', (request, response, next) => next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET', 'POST'])));

// PATCH and DELETE an existing comments

router.patch('/comments/:id(\\d+)', commentController.update);
router.delete('/comments/:id(\\d+)', commentController.delete);
router.all('/comments/:id(\\d+)', (request, response, next) => next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'PATCH', 'DELETE'])));

module.exports = router;
