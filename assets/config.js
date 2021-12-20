const { PORT, NODE_ENV, JWT_SECRET } = process.env;

module.exports.PORT = PORT || 3000;
module.exports.MONGO_ADRESS = 'mongodb://localhost:27017/mestodb';
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';