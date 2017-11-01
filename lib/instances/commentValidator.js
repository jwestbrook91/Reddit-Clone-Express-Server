const Yup = require('yup');

const Validator = require('../validators/Validator');

const { DEBUG } = require('../../env');

const schemas = {
  forCreate: {
    body: Yup.string().trim().required().min(2)
  },
  forUpdate: {
    body: Yup.string().trim().min(2)
  }
};

module.exports = new Validator({
  name: 'Comment',
  schemas,
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});
