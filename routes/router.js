const router = require('express').Router();
const { validateSignup, validateSignin } = require('../assets/joi-schemes');

const { registration, login, logout } = require('../controllers/auth');
const { checkAuth } = require('../middlewares/checkAuth');
const errorHandler = require('../middlewares/errorHandler');

const users = require('./users.js');
const cards = require('./cards.js');
const error = require('./error.js');

router.post('/signup', validateSignup, registration);
router.post('/signin', validateSignin, login);
router.post('/logout', logout);

router
  .use('/users', checkAuth, users)
  .use('/cards', checkAuth, cards)
  .use('*', error)
  .use(errorHandler);

module.exports = router;