const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../assets/config');

module.exports.singup = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  User.validate({ name, about, avatar, email, password })
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201)
        .send({
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

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

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

      res.sendStatus(200);
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt', {
    httpOnly: true,
  });

  res.sendStatus(200);
};