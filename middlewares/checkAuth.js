const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../assets/config');

const { Unauthorized } = require('../assets/errors');

module.exports.checkAuth = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    throw new Unauthorized('Войдите в аккаунт');
  }

  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    throw new Unauthorized('Ошибка авторизации, войдите в аккаунт');
  }

  req.user = payload;

  next();
};