const bcrypt = require('bcryptjs');

const { omit, pick } = require('../utils/ObjectUtils');
const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');
const saltRounds = 10;

class UserService {
  constructor({ userValidator, userRepository, logError }) {
    this._userValidator = userValidator;
    this._userRepository = userRepository;
    this._logError = isFunction(logError) ? logError : noop;
  }

// CREATE a new authenticated user

  async create(attributes, authentication) {
    try {
      attributes = Object.assign({}, attributes);
      attributes = await this._userValidator.validate(attributes, 'forCreate');
      const hashedPassword = await bcrypt.hash(attributes.password, saltRounds);
      delete attributes.password;
      attributes.hashedPassword = hashedPassword;
      const user = await this._userRepository.create(attributes);
      return omit(user, 'hashedPassword');
    } catch (err) {
      this._logError(err);
      if (err.message.endsWith('Validator.ERROR_INVALID_INPUT')) {
        throw this._createInvalidInputError();
      }
      throw this._createUnexpectedError();
    }
  }

// GET user by Id, match with authenticated user

  async getById(id, authentication) {
    try {
    const authenticatedUser = await this._getAuthenticatedUser(authentication);
    const user = await this._userRepository.getById(id);
    if (!user) throw this._createNotFoundError();
    if (authenticatedUser && authenticatedUser.id === id) {
      return omit(user, 'hashedPassword');
    }
    return pick(user, ['id', 'username', 'name'])
    } catch (err) {
    this._logError(err);
    if (err.message.startsWith(UserService.name)) throw err;
    throw this._createUnexpectedError();
    }
  }

// GET authenticated user

  async _getAuthenticatedUser(authentication) {
    const { userId: authenticatedUserId } = authentication;
    if (!Number.isFinite(authenticatedUserId)) return null;
    const authenticatedUser = await this._userRepository.getById(authenticatedUserId);
    return omit(authenticatedUser, 'hashedPassword')
  }

  //ERROR types definition

  _createUnexpectedError() {
    return new Error(UserService.ERROR_UNEXPECTED)
  }

  _createNotFoundError() {
    return new Error(UserService.ERROR_NOT_FOUND)
  }

  _createInvalidInputError() {
    return new Error(UserService.ERROR_INVALID_INPUT)
  }
}

UserService.ERROR_UNEXPECTED = 'UserService.ERROR_UNEXPECTED';
UserService.ERROR_NOT_FOUND = 'UserService.ERROR_NOT_FOUND';
UserService.ERROR_INVALID_INPUT = 'UserService.ERROR_INVALID_INPUT';

module.exports = UserService;
