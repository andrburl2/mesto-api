const router = require('express').Router();
const { validateSignup, validateSignin } = require('../assets/joi-schemes');

const { singup, signin, logout } = require('../controllers/auth');
const { checkAuth } = require('../middlewares/checkAuth');
const errorHandler = require('../middlewares/errorHandler');

const users = require('./users.js');
const cards = require('./cards.js');
const error = require('./error.js');

router.post('/signup', validateSignup, singup);
router.post('/signin', validateSignin, signin);
router.post('/logout', logout);

router
  .use('/users', checkAuth, users)
  .use('/cards', checkAuth, cards)
  .use('*', error)
  .use(errorHandler);

module.exports = router;