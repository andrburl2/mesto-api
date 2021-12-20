const User = require('../models/user');

/*module.exports.getInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({
          status: 200,
          name: user.name,
          email: user.email,
        });
      } else {
        throw new NotFoundError('Не удается найти пользователя');
      }
    })
    .catch(next);
};*/