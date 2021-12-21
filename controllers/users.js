const User = require('../models/user');

const { NotFound } = require('../assets/errors');

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
      } else {
        throw new NotFound('Не удается найти пользователя');
      }
    })
    .catch(next);
};

module.exports.editProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name: name, about: about },
    {
      new: true,
      runValidators: true
    }
  )
    .then((user) => {
      if (user) {
        res.status(200).send({
          user: user
        });
      } else {
        throw new NotFound('Не удается найти пользователя');
      }
    })
    .catch(next);
};

module.exports.editAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    {
      new: true,
      runValidators: true
    }
  )
    .then((user) => {
      if (user) {
        res.status(200).send({
          user: user
        });
      } else {
        throw new NotFound('Не удается найти пользователя');
      }
    })
    .catch(next);
};