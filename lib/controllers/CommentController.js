const EntityController = require('./EntityController');

class CommentController extends EntityController {
  constructor({ commentService, userService }) {
    super({
      entityName: 'Comment',
      entityService: commentService
    });
    this._userService = userService;
    this._bindMethods(['getAllByPostId']);
  }

  async getAllByPostId(req, res, next) {
    try {
      const postId = parseInt(req.params.postId);
      const post = await this._serService.getById(postId, {});
      const comments = await this._entityService.getAllByPostId(post.id);
      res.json(comments);
    } catch (err) {
      next(this._convertError(err));
    }
  }
}

module.exports = CommentController;
