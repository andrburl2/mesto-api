const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { BadRequest } = require('../assets/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Введите ссылку на статью',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введите валидный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
    validate: {
      validator: (password) => /^\S{8,}$/.test(password),
      message: 'Пароль должен состоять как минимум из 8 символов',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadRequest('Пользователь с указанной почтой не зарегистрирован');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new BadRequest('Неправильно введен пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);