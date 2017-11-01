const Yup = require('yup');

const Validator = require('../validators/Validator');

const { DEBUG } = require('../../env');

const schemas = {
  forCreate: {
    title: Yup.string().trim().required().min(2),
    body: Yup.string().trim().min(0)
  },
  forUpdate: {
    title: Yup.string().trim().min(2),
    body: Yup.string().trim().min(0)
  }
};

module.exports = new Validator({
  name: 'Post',
  schemas,
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});
