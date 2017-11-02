const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');
// const { pick } = require('../utils/ObjectUtils');

class PostService {
  constructor({ postValidator, postRepository, userRepository, logError }) {
    this._postValidator = postValidator;
    this._postRepository = postRepository;
    this._userRepository = userRepository;
    this._logError = isFunction(logError) ? logError : noop;
  }

  // Create new post

  async create(attributes, authentication) {
    try {
      const createdPost = await this._postRepository.create(attributes);
      // const authenticatedUser = await this._getAuthenticatedUser(authentication);
      // if (!authenticatedUser) throw this._createPermissionDeniedError();
      // attributes = await this._postValidator.validate(attributes, 'forCreate');
      // attributes.userId = authenticatedUser.id;
      return createdPost;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(PostService.name)) throw error;
      if (error.message.endsWith('Validator.ERROR_INVALID_INPUT')) {
        throw this._createInvalidInputError();
      }
      throw this._createUnexpectedError();
    }
  }

  // GET all posts

  async getAll() {
    try {
      const posts = await this._postRepository.getAll();
      return posts;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(PostService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  // GET posts by id

  async getById(id) {
    try {
      const post = await this._postRepository.getById(id);
      return post;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(PostService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  // UPDATE post (original poster only)

  async update(id, attributes, authentication) {
    try {
      const updatedPost = await this._postRepository.update(id, attributes);
      // const authenticatedUser = await this._getAuthenticatedUser(authentication);
      // if (!authenticatedUser) throw this._createPermissionDeniedError();
      const post = await this._postRepository.getById(id);
      if (!post) throw this._createNotFoundError();
      // if (authenticatedUser.id !== post.userId) {
      //   throw this._createPermissionDeniedError();
      // }
      // attributes = await this._postValidator.validate(attributes, 'forUpdate');
      // attributes.timeModified = new Date().toISOString();
      return updatedPost;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(PostService.name)) throw error;
      if (error.message.endsWith('Validator.ERROR_INVALID_INPUT')) {
        throw this._createInvalidInputError();
      }
      throw this._createUnexpectedError();
    }
  }

  // DELETE post (original poster only)

  async delete(id, authentication) {
    try {
      const deletedPost = await this._postRepository.delete(id);
      // const authenticatedUser = await this._getAuthenticatedUser(authentication);
      // if (!authenticatedUser) throw this._createPermissionDeniedError();
      const post = await this._postRepository.getById(id);
      if (!post) throw this._createNotFoundError();
      // if (authenticatedUser.id !== post.userId) {
      //   throw this._createPermissionDeniedError();
      // }
      console.log(deletedPost); //eslint-disable-line no-console
      return deletedPost;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(PostService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async _getAuthenticatedUser(authentication) {
    const { userId: authenticatedUserId } = authentication;
    if (!Number.isFinite(authenticatedUserId)) return null;
    return await this._userRepository.getUserById(authenticatedUserId);
  }

  _createUnexpectedError() {
    return new Error(PostService.ERROR_UNEXPECTED);
  }

  _createPermissionDeniedError() {
    return new Error(PostService.ERROR_PERMISSION_DENIED);
  }

  _createInvalidInputError() {
    return new Error(PostService.ERROR_INVALID_INPUT);
  }

  _createNotFoundError() {
    return new Error(PostService.ERROR_NOT_FOUND);
  }
}

PostService.ERROR_UNEXPECTED = 'PostService.ERROR_UNEXPECTED';
PostService.ERROR_NOT_FOUND = 'PostService.ERROR_NOT_FOUND';
PostService.ERROR_PERMISSION_DENIED = 'PostService.ERROR_PERMISSION_DENIED';
PostService.ERROR_INVALID_INPUT = 'PostService.ERROR_INVALID_INPUT';

module.exports = PostService;
