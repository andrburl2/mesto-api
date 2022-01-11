const User = require('../models/user');

const { NotFound } = require('../assets/errors');

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send({
          status: 200,
          user,
        });
      } else {
        throw new NotFound('Не удается найти пользователя');
      }
    })
    .catch(next);
};

module.exports.editProfile = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
      avatar,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (user) {
        res.status(200).send({
          status: 200,
          user,
        });
      } else {
        throw new NotFound('Не удается найти пользователя');
      }
    })
    .catch(next);
};