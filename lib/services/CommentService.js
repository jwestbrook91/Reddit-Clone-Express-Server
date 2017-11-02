const { noop } = require('../utils/FunctionUtils');
const { isFunction } = require('../utils/LangUtils');
const { pick } = require('../utils/ObjectUtils');

class CommentService {
  constructor({ commentValidator, commentRepository, userRepository, logError }) {
    this._commentValidator = commentValidator;
    this._commentRepository = commentRepository;
    this._userRepository = userRepository;
    this._logError = isFunction(logError) ? logError : noop;
  }

  // Create a new comment on a post

  async create(attributes, authentication) {
    try {
      const authenticatedUser = await this._getAuthenticatedUser(authentication);
      if (!authenticatedUser) throw this._createPermissionDeniedError();

      attributes = await this._commentValidator.validate(attributes, 'forCreate');
      attributes.commenterId = authenticatedUser.id;
      const comment = await this._commentRepository.create(attributes);
      return comment;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(CommentService.name)) throw error;
      if (error.message.endsWith('Validator.ERROR_INVALID_INPUT')) {
        throw this._createInvalidInputError();
      }
      throw this._createUnexpectedError();
    }
  }

  // GET all comments by postId

  async getAllByPostId(postId) {
    try {
      const comments = await this._commentRepository.getAllByPostId(postId);

      const commenterIds = comments.reduce(
        (commenterIds, comment) => (commenterIds.includes(comment.commenterId) ? commenterIds : [...commenterIds, comment.commenterId]),
        []
      );

      const commenters = await this._userRepository.getByIds(commenterIds);
      const commentersById = commenters.reduce((commentersById, commenter) => Object.assign({}, commentersById, { [commenter.id]: commenter }), {});
      comments.forEach(comment => {
        comment.commenter = pick(commentersById[comment.commenterId], ['id', 'name', 'username']);
      });
      return comments;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(CommentService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  //UPDATE an existing comment (authenticatedUserId === commenterId only)

  async update(id, attribute, authentication) {
    try {
      const authenticatedUser = await this._getAuthenticatedUser(authentication);
      if (!authenticatedUser) throw this._createPermissionDeniedError();
      const comment = await this._commentRepository.getById(id);
      if (!comment) throw this._createNotFoundError();
      if (authenticatedUser.id !== comment.commenterId) throw this._createPermissionDeniedError();

      const attributes = await this._commentValidator.validate(attributes, 'forUpdate');
      const updatedComment = await this._commentRepository.update(id, attributes);
      return updatedComment;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(CommentService.name)) throw error;
      if (error.message.endsWith('Validator.ERROR_INVALID_INPUT')) {
        throw this._createInvalidInputError();
      }
      throw this._createUnexpectedError();
    }
  }

  // DELETE an existing comment (authenticatedUserId === commenterId only)

  async delete(postId, authentication) {
    try {
      const authenticatedUser = await this._getAuthenticatedUser(authentication);
      if (!authenticatedUser) throw this._createPermissionDeniedError();

      const comment = await this._commentRepository.getCommentByPostId(postId);
      if (!comment) throw this._createNotFoundError();
      if (authenticatedUser.id !== comment.commenterId) {
        throw this._createPermissionDeniedError();
      }
      return await this._commentRepository.delete(comment.id);
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(CommentService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async _getAuthenticatedUser(authentication) {
    const { userId: authenticatedUserId } = authentication;
    if (!Number.isFinite(authenticatedUserId)) return null;
    return await this._userRepository.getUserById(authenticatedUserId);
  }

  _createUnexpectedError() {
    return new Error(CommentService.ERROR_UNEXPECTED);
  }

  _createPermissionDeniedError() {
    return new Error(CommentService.ERROR_PERMISSION_DENIED);
  }

  _createInvalidInputError() {
    return new Error(CommentService.ERROR_INVALID_INPUT);
  }

  _createNotFoundError() {
    return new Error(CommentService.ERROR_NOT_FOUND);
  }
}

CommentService.ERROR_UNEXPECTED = 'CommentService.ERROR_UNEXPECTED';
CommentService.ERROR_NOT_FOUND = 'CommentService.ERROR_NOT_FOUND';
CommentService.ERROR_PERMISSION_DENIED = 'CommentService.ERROR_PERMISSION_DENIED';
CommentService.ERROR_INVALID_INPUT = 'CommentService.ERROR_INVALID_INPUT';

module.exports = CommentService;
