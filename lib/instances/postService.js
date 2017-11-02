const PostService = require('../services/PostService');

const { DEBUG } = require('../../env');

module.exports = new PostService({
  postValidator: require('./postValidator'),
  postRepository: require('./postRepository'),
  userRepository: require('./userRepository'),
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});
