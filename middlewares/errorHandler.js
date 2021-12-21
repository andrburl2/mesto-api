const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;
  
  if (err.message === 'Validation failed') {
    statusCode = 400;
    message = 'Невалидные данные'
  }

  if (err.name === 'MongoServerError') {
    statusCode = 409;
    message = 'Данный email уже зарегистрирован';
  }

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
};

module.exports = errorHandler;