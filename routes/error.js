const { NotFound } = require('../assets/errors');

const sendError = (req, res) => {
  throw new NotFound('Такой страницы не существует');
};

module.exports = sendError;