const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err._message.toLowerCase().includes('validation failed')) {
    const regex = /[A-Za-z]+:?\s/gm;
    statusCode = 400;
    message = message.replaceAll(regex, '');
  }

  if (message === 'Validation failed') {
    statusCode = 400;
    message = 'Ошибка в заполнении формы';
  }

  if (err.name === 'MongoServerError') {
    statusCode = 409;
    message = 'Данный email уже зарегистрирован';
  }

  res.status(statusCode).send({
    status: statusCode,
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
};

module.exports = errorHandler;