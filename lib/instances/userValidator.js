const Yup = require('yup');

const Validator = require('../validators/Validator');

const { DEBUG } = require('../../env');

const schemas = {
  forCreate: {
    name: Yup.string().trim().required().min(2),
    username: Yup.string().trim().lowercase().required().min(2),
    password: Yup.string().min(6),
    email: Yup.string().trim().required().min(2)
  },
  forUpdate: {
    name: Yup.string().trim().min(2),
    username: Yup.string().trim().lowercase().min(2)
  }
};

module.exports = new Validator({
  name: 'User',
  schemas,
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});
