const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../assets/config');

module.exports.checkAuth = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    res.send('Войдите в аккаунт');
  }

  try {
    let = payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    res.send('Ошибка авторизации');
  }

  req.user = payload;

  next();
};
