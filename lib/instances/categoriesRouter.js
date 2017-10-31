const express = require('express');
const Boom = require('boom');
const router = express.Router();
const categoryController = require('./categoryController');

// GET all categories for the app

router.get('/categories', categoryController.getAll);
router.all('/categories', (request, response, next) => next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET'])));

// GET all of the posts for a particular category

router.get('/:category/posts', categoryController.getPostsByCategory);
router.all('/:category/posts', (request, response, next) => next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET'])));
