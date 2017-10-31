const express = require('express');
const Boom = require('boom');
const router = express.Router();
const postController = require('./postController');

//Create a new post and get all posts

router.post('/posts', postController.create);
router.get('/posts', postController.getAll);
router.all('/posts', (request, response, next) => next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET', 'POST'])));

// Get single post by id, update post, delete post

router.get('/posts/:id(\\d+)', postController.getById);
router.patch('/posts/:id(\\d+)', postController.update);
router.delete('/articles/:id(\\d+)', postController.delete);
router.all('/articles/:id(\\d+)', (request, response, next) => next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET', 'PATCH', 'DELETE'])));

module.exports = router;
