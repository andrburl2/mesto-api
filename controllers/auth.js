const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../assets/config');

module.exports.registration = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  User.validate({ name, about, avatar, email, password })
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201)
        .send({
          status: 201,
          user: {
            _id: user._id,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          },
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (req.cookies.jwt) {
    return res.status(200).send({ status: 200, message: 'Вы уже вошли'})
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });

      res.status(200).send({ status: 200, message: 'Успешный вход'});
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  

  if (!req.cookies.jwt) {
    return res.status(200).send({ status: 200, message: 'Вы уже вышли'})
  }

  res.clearCookie('jwt', {
    httpOnly: true,
  });

  res.status(200).send({ status: 200, message: 'Успешный выход'});
};